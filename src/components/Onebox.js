import {useState, useEffect} from 'react'
import ReplyBox from './ReplyBox'
import EditorComponent from './EditorComponent'

const Onebox = () => {
  const [threads, setThreads] = useState([])
  const [selectedThreadId, setSelectedThreadId] = useState(null)
  const [showReplyBox, setShowReplyBox] = useState(false)

  useEffect(() => {
    const fetchOneboxData = async () => {
      try {
        const response = await fetch('/onebox/list')
        if (response.ok) {
          const data = await response.json()
          setThreads(data)
        } else {
          console.error('Failed to fetch onebox data', response.statusText)
        }
      } catch (error) {
        console.error('Failed to fetch onebox data', error)
      }
    }
    fetchOneboxData()
  }, [])

  const handleDelete = async threadId => {
    try {
      const response = await fetch(`/onebox/${threadId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setThreads(threads.filter(thread => thread.id !== threadId))
      } else {
        console.error('Failed to delete thread', response.statusText)
      }
    } catch (error) {
      console.error('Failed to delete thread', error)
    }
  }

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'D' && selectedThreadId) {
        handleDelete(selectedThreadId)
      }
      if (event.key === 'R') {
        setShowReplyBox(true)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedThreadId])

  return (
    <div>
      <h2>Onebox</h2>
      <ul>
        {threads.map(thread => (
          <li key={thread.id} onClick={() => setSelectedThreadId(thread.id)}>
            {thread.subject}
          </li>
        ))}
      </ul>
      {showReplyBox && <ReplyBox threadId={selectedThreadId} />}
      <EditorComponent />
    </div>
  )
}

export default Onebox
