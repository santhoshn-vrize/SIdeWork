import React from 'react';

const cardStyle = {
  marginLeft: '15px',
  display: 'flex',
  flexDirection: 'row',
  width: '600px',
  height: '155px',
  borderRadius: '25px',
  alignItems: 'center',
  marginTop: '110px',
  position: 'relative',
  // background: 'url("../../../public/cardbg.jpg") no-repeat center center fixed',
    // background: 'url("./cardbg.jpg") no-repeat center center fixed',
  backgroundAttachment: 'scroll, local',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const CardComponent: React.FC = () => {
  return (
    <div style={cardStyle}>
      {/* Your card content goes here */}
    </div>
  );
};

export default CardComponent;
