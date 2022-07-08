import React from 'react'
import { useGetPostsQuery, useAddNewPostMutation } from '../api/apiSlice'

const PostCard = ({ content }) => {
  return (
    <div className="col-lg-12 mb-3" key={content.id}>
      <div className="card alert alert-success">
        <div className="card-body">
          <h5 className="card-title">{content.title}</h5>
          <p className="card-text">{content.body}</p>
        </div>
      </div>
    </div>
  )
}

function PostsList() {
  let formSubmitError
  const [addNewPost, response] = useAddNewPostMutation()

  const [postForm, setPostForm] = React.useState('Submit')

  const onSubmit = (e) => {
    e.preventDefault()
    const { title, body } = e.target.elements
    let formData = {
      title: title.value,
      body: body.value,
    }

    addNewPost(formData)
      .unwrap()
      .then(() => {})
      .then((error) => {
        console.log(error)
      })
  }

  const {
    data: posts,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetPostsQuery({ refetchOnMountOrArgChange: true })

  let postContent

  if (isGetLoading) {
    postContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (isGetSuccess) {
    postContent = posts.map((item) => {
      return <PostCard content={item} key={item.id} />
    })
  } else if (isGetError) {
    postContent = (
      <div className="alert alert-danger" role="alert">
        {getError}
      </div>
    )
  }

  return (
    <div>
      {formSubmitError}
      <div className="d-flex justify-content-center mb-4">
        <div className="col-md-4 offset-md-*">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <strong>Enter Title</strong>
              </label>
              <input type="text" className="form-control" id="title" />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Enter content</strong>
              </label>
              <textarea className="form-control" id="body" rows="3"></textarea>
            </div>
            <div className="d-grid">
              <button className="btn btn-danger" type="submit">
                {postForm}
              </button>
            </div>
          </form>
        </div>
      </div>

      {postContent}
    </div>
  )
}

export default PostsList
