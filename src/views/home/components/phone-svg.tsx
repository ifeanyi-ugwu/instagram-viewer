export function PhoneSVG() {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="w-64 md:w-80 h-auto mx-auto">
        <div className="bg-gray-900 rounded-[3rem] p-3 shadow-xl">
          <div className="bg-white rounded-[2.5rem] overflow-hidden">
            {/* Phone notch */}
            <div className="w-1/2 h-5 bg-black mx-auto rounded-b-xl mb-1"></div>

            {/* Mock Instagram screen */}
            <div className="h-[500px] relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b">
                <div className="font-semibold text-sm">username</div>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-black"
                >
                  <path
                    fill="currentColor"
                    d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445 0 2.937-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064-2.937 0-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445 0-2.937.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.949-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1z"
                  />
                </svg>
              </div>

              {/* Post */}
              <div>
                <div className="flex items-center p-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] mr-2">
                    <div className="bg-white w-full h-full rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium">username</div>
                </div>
                <div className="aspect-square bg-gray-100"></div>
                <div className="p-3">
                  <div className="flex gap-4 mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                        fill="black"
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
                        fill="black"
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.99 18.87L18.87 15.75L15.75 18.87V10.5H21.99V18.87ZM8.25 10.5H2.01V18.87L5.13 15.75L8.25 18.87V10.5ZM15.75 5.13L18.87 2.01V2.01H21.99V10.38H15.75V5.13ZM8.25 5.13V10.38H2.01V2.01H5.13L8.25 5.13Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium mb-1">123 likes</div>
                  <div className="text-sm">
                    <span className="font-medium">username</span> This is a
                    caption...
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    View all 42 comments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute -top-8 -right-4 w-20 h-20 bg-pink-100 rounded-lg rotate-12 shadow-md hidden sm:block"></div>
      <div className="absolute -bottom-6 -left-8 w-16 h-16 bg-purple-100 rounded-full shadow-md hidden sm:block"></div>
    </div>
  );
}
