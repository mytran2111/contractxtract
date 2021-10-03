import './App.css';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Detailed from './pages/Detailed';
import Home from './pages/Home';

function App() {
  const [text, setText] = React.useState('');
  const [answers, setAnswers] = React.useState(['', '', '', '', ''])

  const onContractUpload = (text, answers) => {
    setText(text);
    setAnswers(answers);
  }

  return (
      <div className="App">
      {/* Headers */}
      <AppBar position="static" variant="outlined" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Contract Explorer
          </Typography>
          <Button color="inherit" variant="outlined">Login</Button>
        </Toolbar>
      </AppBar>
      {/* Router */}
      {text === "" ? <Home onContractUpload={onContractUpload}/> : <Detailed text={text} answers={answers}/>}
    </div>
  );
}

export default App;
