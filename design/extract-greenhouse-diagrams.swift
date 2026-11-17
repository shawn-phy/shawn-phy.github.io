// Extract the original report figures without redrawing or changing their labels.
// Usage: swift design/extract-greenhouse-diagrams.swift <report.pdf> <output-directory>
import AppKit
import Foundation
import PDFKit

guard CommandLine.arguments.count == 3,
      let report = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1])) else {
    fputs("Usage: swift design/extract-greenhouse-diagrams.swift <report.pdf> <output-directory>\n", stderr)
    exit(1)
}

let output = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
let figures: [(name: String, page: Int, rect: CGRect)] = [
    ("system-block-diagram", 64, CGRect(x: 24, y: 122, width: 556, height: 475)),
    ("iot-network-architecture", 66, CGRect(x: 70, y: 610, width: 455, height: 165)),
    ("iot-network-flow", 84, CGRect(x: 70, y: 108, width: 460, height: 592)),
    ("disease-identification-flow", 87, CGRect(x: 72, y: 174, width: 454, height: 568)),
]

for figure in figures {
    guard let page = report.page(at: figure.page - 1) else { exit(1) }
    let bounds = page.bounds(for: .cropBox)
    let image = page.thumbnail(of: NSSize(width: 2400, height: 2400 * bounds.height / bounds.width), for: .cropBox)
    guard let tiff = image.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiff), let source = bitmap.cgImage else { exit(1) }
    let scale = CGFloat(source.width) / bounds.width
    let rect = CGRect(x: figure.rect.minX * scale,
                      y: (bounds.height - figure.rect.maxY) * scale,
                      width: figure.rect.width * scale, height: figure.rect.height * scale).integral
    guard let crop = source.cropping(to: rect),
          let png = NSBitmapImageRep(cgImage: crop).representation(using: .png, properties: [:]) else { exit(1) }
    try png.write(to: output.appendingPathComponent("\(figure.name).png"))
    print("Extracted \(figure.name) from PDF page \(figure.page)")
}
