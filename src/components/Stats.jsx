import React from 'react'

const Stats = () => {
	return (
		  <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">28+</div>
              <div className="text-blue-100">Icon Sizes Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$200+</div>
              <div className="text-blue-100">Saved in Design Costs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">&lt;30s</div>
              <div className="text-blue-100">Processing Time</div>
            </div>
          </div>
        </div>
	)
}

export default Stats