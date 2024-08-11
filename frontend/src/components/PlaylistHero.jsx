import React from 'react'
import PlaylistCard from './PlaylistCard'
import { usePlaylists } from '../hooks/usePlaylist'

const PlaylistHero = () => {
  const { data: playlists, isLoading, isError } = usePlaylists()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap gap-5 mt-10 items-center justify-center">
      {playlists?.map((playlist) => {
        return (
          <PlaylistCard
            key={playlist?._id}
            title={playlist?.name || ''}
            image={playlist?.image || ''}
            color={playlist?.bgColor || ''}
            offer={playlist?.offer || ''}
          />
        )
      })}

      {/* <button className="m-10 group rounded-full px-1 py-3 flex items-center">
        <h1 className="font-semibold group-hover:mr-2 duration-100 transition-all ease-in">
          See More
        </h1>
        <MdOutlineArrowOutward className="group-hover:scale-125 mx-1 w-7 h-7 flex items-center text-lg rounded-full p-1 text-[#9FE870] bg-[#083400]" />
      </button> */}
    </div>
  )
}

export default PlaylistHero
