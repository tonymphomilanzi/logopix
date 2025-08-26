import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, Smartphone, Monitor, Tablet, Image as ImageIcon, Coffee } from 'lucide-react'; 

const LogoToAppIconGenerator = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedIcons, setGeneratedIcons] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Icon sizes for different platforms
  const iconSizes = {
    ios: [
      { size: 1024, name: 'App Store', filename: 'ios-1024.png' },
      { size: 180, name: 'iPhone 6 Plus/6s Plus/7 Plus', filename: 'ios-180.png' },
      { size: 167, name: 'iPad Pro', filename: 'ios-167.png' },
      { size: 152, name: 'iPad/iPad mini', filename: 'ios-152.png' },
      { size: 120, name: 'iPhone/iPod Touch', filename: 'ios-120.png' },
      { size: 87, name: 'iPhone 6 Plus/6s Plus/7 Plus Settings', filename: 'ios-87.png' },
      { size: 80, name: 'iPad Settings', filename: 'ios-80.png' },
      { size: 76, name: 'iPad', filename: 'ios-76.png' },
      { size: 58, name: 'iPhone Settings', filename: 'ios-58.png' },
      { size: 40, name: 'iPad Spotlight', filename: 'ios-40.png' },
      { size: 29, name: 'iPhone/iPad Settings', filename: 'ios-29.png' }
    ],
    android: [
      { size: 512, name: 'Google Play Store', filename: 'android-512.png' },
      { size: 192, name: 'XXXHDPI', filename: 'android-192.png' },
      { size: 144, name: 'XXHDPI', filename: 'android-144.png' },
      { size: 96, name: 'XHDPI', filename: 'android-96.png' },
      { size: 72, name: 'HDPI', filename: 'android-72.png' },
      { size: 48, name: 'MDPI', filename: 'android-48.png' },
      { size: 36, name: 'LDPI', filename: 'android-36.png' }
    ],
    web: [
      { size: 512, name: 'PWA Large', filename: 'web-512.png' },
      { size: 256, name: 'PWA Medium', filename: 'web-256.png' },
      { size: 192, name: 'PWA Small', filename: 'web-192.png' },
      { size: 180, name: 'Apple Touch Icon', filename: 'web-180.png' },
      { size: 152, name: 'iPad Touch Icon', filename: 'web-152.png' },
      { size: 144, name: 'Windows Tile', filename: 'web-144.png' },
      { size: 120, name: 'iPhone Touch Icon', filename: 'web-120.png' },
      { size: 76, name: 'iPad Safari', filename: 'web-76.png' },
      { size: 32, name: 'Favicon', filename: 'web-32.png' },
      { size: 16, name: 'Favicon Small', filename: 'web-16.png' }
    ]
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Use the native Image constructor here
        const img = new window.Image(); 
        img.onload = () => {
          setUploadedImage({ src: e.target.result, width: img.width, height: img.height });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const generateIcon = useCallback((imageData, size) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = size;
      canvas.height = size;

      // Use the native Image constructor here
      const img = new window.Image(); 
      img.onload = () => {
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, size, size);
        
        // Calculate scaling to fit image within square while maintaining aspect ratio
        const scale = Math.min(size / img.width, size / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (size - scaledWidth) / 2;
        const y = (size - scaledHeight) / 2;

        // Draw image centered
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = imageData;
    });
  }, []);

  const generateAllIcons = async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    const icons = [];

    for (const platform of Object.keys(iconSizes)) {
      for (const iconSpec of iconSizes[platform]) {
        const iconData = await generateIcon(uploadedImage.src, iconSpec.size);
        icons.push({
          platform,
          ...iconSpec,
          dataUrl: iconData
        });
      }
    }

    setGeneratedIcons(icons);
    setIsProcessing(false);
  };

  const downloadIcon = (icon) => {
    const link = document.createElement('a');
    link.download = icon.filename;
    link.href = icon.dataUrl;
    link.click();
  };

  const downloadAll = () => {
    generatedIcons.forEach((icon, index) => {
      setTimeout(() => downloadIcon(icon), index * 100);
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'ios': return <Smartphone className="w-4 h-4" />;
      case 'android': return <Tablet className="w-4 h-4" />;
      case 'web': return <Monitor className="w-4 h-4" />;
      default: return <ImageIcon className="w-4 h-4" />; // Use ImageIcon here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter relative"> {/* Added relative positioning */}
      {/* Buy Me a Coffee Button 
      <a 
        href="https://www.Ko-fi.com/tonymphomilanzi" //
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all duration-200 text-sm font-semibold"
      >
        <Coffee className="w-4 h-4 " />
        Support me on Ko-fi
      </a>*/}




      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            {/**<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Smartphone className="w-12 h-12 text-white" />
            </div>**/}
          </div>
          <h1 className="text-4xl mt-20 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 pt-2 pb-4 leading-tight">
  LogoPix
</h1>
          <p className=" text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert your logo into professionally sized app icons for iOS, Android, and web platforms. 
            Generate all required sizes instantly for free <span className="font-semibold text-green-600"> on design costs</span>.
          </p>
          <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>28+ Icon Sizes</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>All Platforms</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Instant Download</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-4 mb-4">
          <div className="text-center">
            {!uploadedImage ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Upload Your Logo
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Click to upload or drag and drop your logo file
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  <ImageIcon className="w-5 h-5" /> {/* Use ImageIcon here */}
                  Choose File
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Supports PNG, JPG, SVG • Recommended: Square format, 1024×1024px or higher
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-lg">
                      <img 
                        src={uploadedImage.src} 
                        alt="Uploaded logo" 
                        className="max-w-72 max-h-72 object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                  <ImageIcon className="w-4 h-4" /> {/* Use ImageIcon here */}
                  {uploadedImage.width} × {uploadedImage.height} pixels
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-xl hover:border-gray-400 transition-colors duration-200"
                  >
                    Change Logo
                  </button>
                  <button
                    onClick={generateAllIcons}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generating Icons...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Generate App Icons
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Generated Icons */}
        {generatedIcons.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Generated Icons
                </h2>
                <p className="text-gray-600">
                  {generatedIcons.length} perfectly sized icons ready for all platforms
                </p>
              </div>
              <button
                onClick={downloadAll}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download All Icons
              </button>
            </div>

            {Object.keys(iconSizes).map((platform) => (
              <div key={platform} className="mb-10 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
                    {getPlatformIcon(platform)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {platform === 'ios' ? 'iOS App Store' : platform === 'android' ? 'Google Play Store' : 'Web & PWA'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {iconSizes[platform].length} optimized sizes
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {generatedIcons
                    .filter(icon => icon.platform === platform)
                    .map((icon, index) => (
                      <div key={index} className="group">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                          <div className="bg-white rounded-xl p-3 mb-3 shadow-sm group-hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img
                              src={icon.dataUrl}
                              alt={`${icon.size}px icon`}
                              className="w-14 h-14 mx-auto object-contain relative z-10"
                            />
                          </div>
                          <div className="text-sm font-bold text-gray-800 mb-1">
                            {icon.size}×{icon.size}
                          </div>
                          <div className="text-xs text-gray-600 mb-3 h-8 flex items-center justify-center leading-tight">
                            {icon.name}
                          </div>
                          <button
                            onClick={() => downloadIcon(icon)}
                            className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-105 font-medium"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">All Platforms Covered</h3>
            <p className="text-gray-600 leading-relaxed">Generate icons for iOS App Store, Google Play Store, and web platforms with all required sizes and specifications.</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Download className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Instant Download</h3>
            <p className="text-gray-600 leading-relaxed">Download individual icons or get all 28+ sizes at once with a single click. No waiting, no processing delays.</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <ImageIcon className="w-10 h-10 text-white" /> {/* Use ImageIcon here */}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Premium Quality</h3>
            <p className="text-gray-600 leading-relaxed">Maintains crisp image quality with proper scaling and optimization. Professional results every time.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">28+</div>
              <div className="text-blue-100">Icon Sizes Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$+</div>
              <div className="text-blue-100">Save in Design Costs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">&lt;30s</div>
              <div className="text-blue-100">Processing Time</div>
            </div>
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default LogoToAppIconGenerator;
