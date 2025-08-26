import React from 'react'

const Header = () => {
	return (
		   <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            {/**<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Smartphone className="w-12 h-12 text-white" />
            </div>**/}
          </div>
          <h1 className="text-4xl mt-20 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 pt-2 pb-4 leading-tight">
  LogoPix
           </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert your logo into professionally sized app icons for iOS, Android, and web platforms. 
            Generate all required sizes instantly for free <span className="font-semibold text-green-600">save $200+</span> on design costs.
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
	)
}

export default Header