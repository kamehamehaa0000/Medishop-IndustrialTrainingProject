import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchAllPlaylists = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/playlists/getall`,
    {
      withCredentials: true,
    }
  )
  return data.data
}

export const usePlaylists = () => {
  return useQuery('playlists', fetchAllPlaylists)
}

const createPlaylist = async (playlistData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/playlists/create`,
    playlistData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  )
  return data.data
}

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation(createPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries('playlists')
    },
  })
}

const updatePlaylist = async ({ id, playlistData }) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/playlists/update/${id}`,
    playlistData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  )
  return data.data
}

export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries('playlists')
    },
  })
}

const deletePlaylist = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/playlists/delete/${id}`,
    {
      withCredentials: true,
    }
  )
  return data.data
}

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient()

  return useMutation(deletePlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries('playlists')
    },
  })
}
