import {useState} from 'react'

const ReplyBox = ({threadId}) => {
  const [email, setEmail] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [editorContent, setEditorContent] = useState('')

  const handleReply = async () => {
    try {
      const response = await fetch(`/reply/${threadId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: email,
          to: recipientEmail,
          subject,
          body: editorContent,
        }),
      })

      if (!response.ok) {
        console.error('Failed to send reply', response.statusText)
      }
    } catch (error) {
      console.error('Failed to send reply', error)
    }
  }

  return (
    <div>
      <h3>Reply</h3>
      <input
        type="email"
        placeholder="From"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="email"
        placeholder="To"
        value={recipientEmail}
        onChange={e => setRecipientEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={editorContent}
        onChange={e => setEditorContent(e.target.value)}
      />
      <button type="button" onClick={handleReply}>
        Send
      </button>
    </div>
  )
}

export default ReplyBox
