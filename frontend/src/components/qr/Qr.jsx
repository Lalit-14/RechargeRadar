import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const Qr = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      {text && (
        <div style={{ marginTop: '10px' }}>
          <QRCode value={text} />
        </div>
      )}
    </div>
  );
};

export default Qr;
