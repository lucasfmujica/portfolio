// PNG frame sequence -> H.264 .mp4 via AVFoundation. Ships with macOS + Xcode,
// so no ffmpeg needed (sharp/libvips here cannot write animated WebP, and
// avconvert only transcodes existing video).
// build: swiftc -O encode.swift -o encode
// usage: ./encode <framesDir> <out.mp4> <fps> [bitrate, default 1200000]
import AVFoundation
import AppKit
import Foundation

let args = CommandLine.arguments
guard args.count >= 4 else { FileHandle.standardError.write("usage: encode <dir> <out.mp4> <fps> [bitrate]\n".data(using: .utf8)!); exit(2) }
let dir = args[1], outPath = args[2], fps = Int32(args[3]) ?? 24
let bitrate = args.count > 4 ? (Int(args[4]) ?? 1_200_000) : 1_200_000

let files = try FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".png") }.sorted()
guard let first = files.first,
      let firstCG = NSImage(contentsOfFile: "\(dir)/\(first)")?.cgImage(forProposedRect: nil, context: nil, hints: nil)
else { FileHandle.standardError.write("no frames in \(dir)\n".data(using: .utf8)!); exit(1) }
let w = firstCG.width - firstCG.width % 2, h = firstCG.height - firstCG.height % 2 // H.264 wants even sizes

try? FileManager.default.removeItem(atPath: outPath)
let writer = try AVAssetWriter(outputURL: URL(fileURLWithPath: outPath), fileType: .mp4)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: w, AVVideoHeightKey: h,
    AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: bitrate,
                                      AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel],
])
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32ARGB),
    kCVPixelBufferWidthKey as String: w, kCVPixelBufferHeightKey as String: h])
writer.add(input); writer.startWriting(); writer.startSession(atSourceTime: .zero)

let done = DispatchSemaphore(value: 0)
var idx = 0
input.requestMediaDataWhenReady(on: DispatchQueue(label: "encode")) {
    while input.isReadyForMoreMediaData {
        guard idx < files.count else { input.markAsFinished(); writer.finishWriting { done.signal() }; return }
        defer { idx += 1 }
        guard let cg = NSImage(contentsOfFile: "\(dir)/\(files[idx])")?.cgImage(forProposedRect: nil, context: nil, hints: nil),
              let pool = adaptor.pixelBufferPool else { continue }
        var pb: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault, pool, &pb)
        guard let buffer = pb else { continue }
        CVPixelBufferLockBaseAddress(buffer, [])
        CGContext(data: CVPixelBufferGetBaseAddress(buffer), width: w, height: h, bitsPerComponent: 8,
                  bytesPerRow: CVPixelBufferGetBytesPerRow(buffer), space: CGColorSpaceCreateDeviceRGB(),
                  bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)?
            .draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
        CVPixelBufferUnlockBaseAddress(buffer, [])
        adaptor.append(buffer, withPresentationTime: CMTime(value: CMTimeValue(idx), timescale: fps))
    }
}
done.wait()
guard writer.status == .completed else {
    FileHandle.standardError.write("failed: \(writer.error?.localizedDescription ?? "unknown")\n".data(using: .utf8)!); exit(1)
}
print("wrote \(outPath) — \(files.count) frames, \(w)x\(h) @ \(fps)fps")
