import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PostCard from './PostCard'
import PostForm from './PostForm';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { loggedIn } from './atoms';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

function PostPage() {

    const [college, setCollege] = useState({})
    const [posts, setPosts] = useState([])
    const recoilLogin = useRecoilValue(loggedIn)

    const {college_name} = useParams()
    // useParams = {college_name: Notre Dame}//

    useEffect(() => {
      fetch(`http://localhost:9292/colleges/${college_name}`)
      .then(res => res.json())
      .then(setCollege)}
    ,[college_name])

    useEffect(() => {
      fetch(`http://localhost:9292/colleges/${college_name}/posts`)
      .then(res => res.json())
      .then(setPosts)}
      ,[college])

    function addNewPost(data){
      setPosts((posts) => [...posts, data])
    }

    function updatePost(data){
      const updatedPosts = posts.map((mp) => {
        if (mp.id === data.id) {
          return data
        } else {
          return mp
        }
      })
      setPosts((updatedPosts))
    }

    function deletePost(id) {
      const deletedPosts = posts.filter((mp) => {
        if (mp.id === id) {
          return false
        } else {
          return true
        }
      })
      setPosts((deletedPosts))
    }

    const collegePosts = posts.map((post, indx) => {
      return <PostCard
        key={indx}
        post={post}
        deletePost={deletePost}
        updatePost={updatePost}
      />
    })

    const  rootStyle = { marginTop: '50px' }
    const formButtonStyle = {marginTop: '8px', marginLeft: 'calc(50vh + 200px)'}
    
    return (
      <>
        <div style={formButtonStyle}>
          {recoilLogin? <PostForm college={college} addNewPost={addNewPost}/> : null}
        </div>
        <Container style={rootStyle} sx={{height: 1000, width: 1100}}>
          <Box>
            <Grid container spacing={5}>
              {collegePosts}
            </Grid>
          </Box>
        </Container>
      </>
    )
}

export default PostPage