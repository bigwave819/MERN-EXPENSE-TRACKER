import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPopUp = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
            {/* Icon Selector */}
            <div
                className='flex items-center gap-4 cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                <div className='w-12 h-12 flex items-center justify-center bg-purple-50 text-primary rounded-lg'>
                    {icon ? (
                        <span className='text-2xl w-12 h-12 rounded-lg'>{icon}</span>
                    ) : (
                        <LuImage className="text-2xl" />
                    )}
                </div>
                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {/* Emoji Picker Popup */}
            {isOpen && (
                <div className='relative'>
                    {/* Close Button */}
                    <button
                        className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
                        aria-label="Close emoji picker"
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX className="text-gray-600" />
                    </button>

                    {/* Emoji Picker */}
                    <EmojiPicker
                        onEmojiClick={(emoji) => {
                            onSelect(emoji.emoji);
                            setIsOpen(false); // Close after selection
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopUp
