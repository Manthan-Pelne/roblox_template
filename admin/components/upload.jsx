// admin/components/upload.jsx
import React from 'react'

const UploadComponent = (props) => {
  const { record, property } = props
  const fileKey = record?.params?.[property.name]

return (
  <div>
    {fileKey ? (
      <div>
        <p>Preview image:</p>
        <img
          src={fileKey}
          alt="Uploaded"
          style={{
            maxWidth: '100px',
            maxHeight: '100px',
            objectFit: 'cover',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    ) : (
      <p>No file uploaded.</p>
    )}
  </div>
)
}

export default UploadComponent