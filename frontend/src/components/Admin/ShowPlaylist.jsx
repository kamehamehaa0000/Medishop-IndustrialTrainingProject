import React, { useState } from 'react'
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md'
import {
  useDeletePlaylist,
  usePlaylists,
  useCreatePlaylist,
  useUpdatePlaylist,
} from '../../hooks/usePlaylist'
import PlaylistCard from '../PlaylistCard'
import Loader from '../shared/Loader'
import { toast } from 'react-toastify'

const ShowPlaylist = () => {
  const { data: playlists, isLoading, isError } = usePlaylists()
  const deletePlaylistMutation = useDeletePlaylist()
  const { mutate: createPlaylistMutation } = useCreatePlaylist()
  const { mutate: updatePlaylistMutation } = useUpdatePlaylist()

  const [editingPlaylist, setEditingPlaylist] = useState(null)
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    bgColor: '',
    image: null,
    offer: '',
  })

  const handleEdit = (playlist) => {
    setEditingPlaylist(playlist)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylistMutation.mutate(id)
    }
  }

  const handleCreate = () => {
    const formData = new FormData()
    formData.append('name', newPlaylist.name)
    formData.append('bgColor', newPlaylist.bgColor)
    formData.append('offer', newPlaylist.offer)
    if (newPlaylist.image) formData.append('playlistImage', newPlaylist.image)

    createPlaylistMutation(formData, {
      onSuccess: () => {
        toast.success('Offer Card Created Successfully!!')
        setNewPlaylist({ name: '', bgColor: '', image: null, offer: '' })
      },
      onError: () => {
        toast.error('Error Occured while creating Offer Card')
      },
    })
  }

  const handleUpdate = (id) => {
    const formData = new FormData()
    if (editingPlaylist.name) {
      formData.append('name', editingPlaylist.name)
    }
    if (editingPlaylist.color) {
      formData.append('bgColor', editingPlaylist.bgColor)
    }
    if (editingPlaylist.offer) {
      formData.append('offer', editingPlaylist.offer)
    }

    if (editingPlaylist.image) {
      formData.append('playlistImage', editingPlaylist.image)
    }
    updatePlaylistMutation(
      { id, playlistData: formData },
      {
        onSuccess: () => {
          toast.success('Offer Card updated!')
          setEditingPlaylist(null)
        },
        onError: () => {
          toast.error('Error occured while updating offer Card.')
          setEditingPlaylist(null)
        },
      }
    )
  }
  console.log(playlists)
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Playlists</h1>
      <div className="mb-5 p-4 max-w-lg text-base border rounded-lg bg-gray-100">
        <h2 className="text-lg font-semibold mb-3">Create New Playlist</h2>
        <input
          type="text"
          placeholder="name"
          className="w-full px-2 py-1 mb-2 border rounded-lg "
          value={newPlaylist.name}
          onChange={(e) =>
            setNewPlaylist({ ...newPlaylist, name: e.target.value })
          }
        />
        <div className="flex items-center font-semibold">
          <label
            htmlFor="hs-color-input"
            className="block text-sm font-medium mb-2 mr-2"
          >
            Color picker
          </label>

          <input
            type="color"
            className=" w-1/4 h-8 border-none dark:border-none dark:bg-white block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none  "
            value={newPlaylist.bgColor}
            onChange={(e) =>
              setNewPlaylist({ ...newPlaylist, bgColor: e.target.value })
            }
          />
        </div>
        <input
          type="text"
          className="w-full px-2 py-1 mb-2 border rounded-lg "
          value={newPlaylist.offer}
          placeholder="Offer"
          onChange={(e) =>
            setNewPlaylist({ ...newPlaylist, offer: e.target.value })
          }
        />
        <input
          type="file"
          className="w-full px-2 py-1 mb-2 border rounded-lg "
          onChange={(e) =>
            setNewPlaylist({ ...newPlaylist, image: e.target.files[0] })
          }
        />
        <button
          className="w-fit p-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleCreate}
        >
          <MdAdd size={20} className="inline-block mr-2" />
          Create Playlist
        </button>
      </div>

      {/* Playlists Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          'Error Loading playlist'
        ) : (
          playlists?.map((playlist) => (
            <div key={playlist._id} className="relative">
              {editingPlaylist && editingPlaylist._id === playlist._id ? (
                <div className="p-4 text-base border rounded-lg bg-gray-100">
                  <input
                    type="text"
                    placeholder="name"
                    className="w-full px-2 py-1 mb-2 border rounded-lg "
                    value={editingPlaylist.name}
                    onChange={(e) =>
                      setEditingPlaylist({
                        ...editingPlaylist,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="offer"
                    className="w-full px-2 py-1 mb-2 border rounded-lg "
                    value={editingPlaylist.offer}
                    onChange={(e) =>
                      setEditingPlaylist({
                        ...editingPlaylist,
                        offer: e.target.value,
                      })
                    }
                  />
                  <input
                    type="file"
                    className="w-full px-2 py-1 mb-2 border rounded-lg "
                    onChange={(e) =>
                      setEditingPlaylist({
                        ...editingPlaylist,
                        image: e.target.files[0],
                      })
                    }
                  />
                  <input
                    type="color"
                    className=" w-1/4 h-8 border-none dark:border-none dark:bg-white block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none  "
                    value={editingPlaylist.bgColor}
                    onChange={(e) =>
                      setEditingPlaylist({
                        ...editingPlaylist,
                        bgColor: e.target.value,
                      })
                    }
                  />
                  <button
                    className="w-1/2 p-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleUpdate(playlist._id)}
                  >
                    Save
                  </button>
                  <button
                    className="w-1/3 text-sm mx-2 p-2 bg-gray-500 text-white rounded mt-2 hover:bg-gray-600"
                    onClick={() => setEditingPlaylist(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <PlaylistCard
                  name={playlist.name}
                  image={playlist.image}
                  color={playlist.bgColor}
                  offer={playlist.offer}
                />
              )}
              {!editingPlaylist && (
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    onClick={() => handleEdit(playlist)}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    onClick={() => handleDelete(playlist._id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ShowPlaylist
