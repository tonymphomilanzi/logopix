import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, Image, Smartphone, Monitor, Tablet } from 'lucide-react';

const Features = () => {
	return (
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
	)
}

export default Features