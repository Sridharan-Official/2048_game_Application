import { useEffect, useState } from 'react';

import './App.css';

import { Box, Button, Grid2, Link, Menu, MenuItem, Modal, Stack, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LuUndo2 } from "react-icons/lu";
import { IoRemoveOutline, IoStarOutline } from "react-icons/io5";
import { RiSwap2Fill, RiVipCrownFill } from "react-icons/ri";
import { BsGridFill, BsFillGridFill } from "react-icons/bs";
import { FaFlag } from "react-icons/fa";


function App() {

  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])
  const [score, SetScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null);
  const [newGameModal, setNewGameModal] = useState(false)

  const positiongrid = [14, 132, 250, 368]
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const defaultlayout = (i) => {
    const temp = []
    for (let forward = 14; forward <= 368; forward += 118) {
      temp.push(
        <g key={`staticPosition=${i}-${forward}`}>
          <rect x={forward} y={i} width="108" height="108" rx="10" fill='#BAAC9A' />
        </g>
      )
    }
    return temp;
  }

  const updatedLayout = (startColumn, i) => {
    const temp = []
    const y = 65
    const singleX = 45;
    const doubleX = 35;
    const tribleX = 20;
    const quadrupleX = 13;
    const quintupleX = 0;

    const boxColor = {
      2: "#EEE4DA",
      4: "#EDE0C8",
      8: "#F2B179",
      16: "#F59563",
      32: "#F67C5F",
      64: "#F65E3B",
      128: "#EDCF72",
      256: "#EDCC61",
      512: "#EDC850",
      1024: "#EDC53F",
      2048: "#EDC22E",
      4096: "#3D3A33",
      8192: "#6B4D3E",
      16384: "#92755A",
      32768: "#C19A6B"
    }

    let startRow = 14;
    for (let j = 0; j < grid.length; j++) {
      let numberXAlign = startRow;
      if (Math.floor(grid[i][j] / 10) === 0)
        numberXAlign += singleX;
      else if (Math.floor(grid[i][j] / 100) === 0)
        numberXAlign += doubleX;
      else if (Math.floor(grid[i][j] / 1000) === 0)
        numberXAlign += tribleX;
      else if (Math.floor(grid[i][j] / 10000) === 0)
        numberXAlign += quadrupleX;
      else if (Math.floor(grid[i][j] / 100000) === 0)
        numberXAlign += quintupleX;
      else
        numberXAlign += quintupleX;

      temp.push(
        <g key={`dynamicposition=${startColumn}-${startRow}`}>
          <>
            <rect x={startRow} y={startColumn} width="108" height="108" rx="10" fill={grid[i][j] ? boxColor[grid[i][j]] : "#BAAC9A"} />
            <text x={numberXAlign} y={startColumn + y} style={{ fontSize: 39, fontWeight: 500 }} ><tspan fill='rgb(135 114 89)' style={{ fontWeight: 'bold' }}>{grid[i][j] || ""}</tspan></text>
          </>
        </g>
      )
      startRow += 118;
    }
    return temp;
  }

  const leftArrow = (numberGrid) => {

    let tempscore = 0;
    for (let i = 0; i < 4; i++) {

      const filteredArray = numberGrid[i].filter(item => item)
      for (let j = 0; j < filteredArray.length - 1; j++) {

        if (filteredArray.length >= 1 && filteredArray[j] === filteredArray[j + 1]) {
          filteredArray[j] += filteredArray[j + 1];
          filteredArray[j + 1] = 0;
          tempscore += filteredArray[j]
          for (let k = j + 1; k < filteredArray.length - 1; k++) {
            if (filteredArray[k] === 0) {
              filteredArray[k] = filteredArray[k + 1];
              filteredArray[k + 1] = 0
            }

          }
        }
      }

      let count = 0
      for (let index = 0; index < 4; index++) {
        count < filteredArray.length ? numberGrid[i][index] = filteredArray[count++] : numberGrid[i][index] = 0
      }

    }
    SetScore(score + tempscore)

    return numberGrid;

  }

  const rightArrow = (numberGrid) => {
    let tempscore = 0;
    for (let i = 0; i < 4; i++) {

      const filteredArray = numberGrid[i].filter(item => item)

      for (let j = filteredArray.length - 1; j > 0; j--) {
        if (filteredArray.length >= 1 && filteredArray[j] === filteredArray[j - 1]) {
          filteredArray[j] += filteredArray[j - 1];
          filteredArray[j - 1] = 0;
          tempscore += filteredArray[j]
          for (let k = j - 1; k > 0; k--) {
            if (filteredArray[k] === 0) {
              filteredArray[k] = filteredArray[k - 1];
              filteredArray[k - 1] = 0
            }

          }
        }
      }

      let count = filteredArray.length - 1;
      for (let index = 3; index >= 0; index--) {
        count >= 0 ? numberGrid[i][index] = filteredArray[count--] : numberGrid[i][index] = 0
      }

    }
    SetScore(score + tempscore)
    return numberGrid;
  }

  const downArrow = (numberGrid) => {
    let tempscore = 0;
    for (let i = 0; i < 4; i++) {

      const tempArray = [];

      for (let j = 3; j >= 0; j--) {
        tempArray.push(numberGrid[j][i])
      }

      const filteredArray = tempArray.filter(item => item)

      for (let j = 0; j < filteredArray.length - 1; j++) {

        if (filteredArray.length >= 1 && filteredArray[j] === filteredArray[j + 1]) {
          filteredArray[j] += filteredArray[j + 1];
          filteredArray[j + 1] = 0;
          tempscore += filteredArray[j]
          for (let k = j + 1; k < filteredArray.length - 1; k++) {
            if (filteredArray[k] === 0) {
              filteredArray[k] = filteredArray[k + 1];
              filteredArray[k + 1] = 0
            }

          }
        }
      }

      let count = 0;
      for (let index = 3; index >= 0; index--) {
        count < filteredArray.length ? numberGrid[index][i] = filteredArray[count++] : numberGrid[index][i] = 0
      }

    }
    SetScore(score + tempscore)
    return numberGrid;
  }

  const upArrow = (numberGrid) => {

    let tempscore = 0;
    for (let i = 0; i < 4; i++) {

      const tempArray = [];

      for (let j = 0; j < 4; j++) {
        tempArray.push(numberGrid[j][i])
      }

      const filteredArray = tempArray.filter(item => item)

      for (let j = 0; j < filteredArray.length - 1; j++) {

        if (filteredArray.length >= 1 && filteredArray[j] === filteredArray[j + 1]) {
          filteredArray[j] += filteredArray[j + 1];
          filteredArray[j + 1] = 0;
          tempscore += filteredArray[j]
          for (let k = j + 1; k < filteredArray.length - 1; k++) {
            if (filteredArray[k] === 0) {
              filteredArray[k] = filteredArray[k + 1];
              filteredArray[k + 1] = 0
            }

          }
        }
      }

      let count = 0;
      for (let index = 0; index < 4; index++) {
        count < filteredArray.length ? numberGrid[index][i] = filteredArray[count++] : numberGrid[index][i] = 0
      }

    }
    SetScore(score + tempscore)
    return numberGrid;
  }

  document.onkeydown = function (event) {
    switch (event.key) {
      case "ArrowLeft":
        {

          const numberGrid = leftArrow(grid);

          setMoves(moves + 1)
          let newOne = createData(numberGrid);

          if (newOne) {
            numberGrid[newOne[0]][newOne[1]] = 2;
          }
          setGrid(numberGrid)
          break;
        }
      case "ArrowUp":
        {

          const numberGrid = upArrow(grid);
          setMoves(moves + 1)
          let newOne = createData(numberGrid);

          if (newOne) {
            numberGrid[newOne[0]][newOne[1]] = 2;
          }
          setGrid(numberGrid)
          break;
        }
      case "ArrowRight":
        {

          const numberGrid = rightArrow(grid);

          setMoves(moves + 1)
          let newOne = createData(numberGrid);

          if (newOne) {
            numberGrid[newOne[0]][newOne[1]] = 2;
          }
          setGrid(numberGrid)
          break;
        }
      case "ArrowDown":
        {

          const numberGrid = downArrow(grid);

          setMoves(moves + 1)
          let newOne = createData(numberGrid);

          if (newOne) {
            numberGrid[newOne[0]][newOne[1]] = 2;
          }
          setGrid(numberGrid)
          break;
        }
      default:
        break;
    }

  }


  const createDataRandom = (positionChoosing) => {
    return Math.floor(Math.random() * positionChoosing.length)
  }

  const createData = (numberGrid) => {
    const positionChoosing = []
    for (let i = 0; i < numberGrid.length; i++) {
      for (let j = 0; j < numberGrid.length; j++) {
        if (numberGrid[i][j] === 0)
          positionChoosing.push(`${i} ${j}`)
      }
    }
    let random;
    let randomArray;

    if (positionChoosing.length) {
      random = positionChoosing[createDataRandom(positionChoosing)];
      randomArray = random.split(" ")
      randomArray[0] = Number(randomArray[0])
      randomArray[1] = Number(randomArray[1])
      return randomArray;
    }
    else {
      alert(moves + " moves new Game")
      newGame()
    }

  }

  const newGame = () => {
    const intialArray = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]

    setMoves(0)
    setHighScore(highScore <= score ? score : highScore);
    SetScore(0)
    setNewGameModal(false)
    let one = createData(intialArray);
    let two = createData(intialArray);
    if (one[1] === two[1] && one[0] === two[0]) {
      if (two[1] <= 2) {
        two[1] += 1;
      }
      else {
        two[1] -= 1;
      }
    }
    intialArray[one[0]][one[1]] = 2
    intialArray[two[0]][two[1]] = 2
    setGrid([...intialArray]);
  }

  useEffect(() => {
    newGame();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Grid2 container alignContent={'center'} marginTop={3}>
        <Grid2 containe size={5}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{ display: 'flex', alignItems: 'center', height: 43, color: 'rgb(135 114 89)', fontFamily: 'inherit' }}
          >
            <MenuIcon /> <Typography gutterBottom marginTop={2} fontWeight={700} fontSize={"3rem"} paddingLeft={2}>
              2048
            </Typography>
          </Button>
          <Box bgcolor={"rgb(224 218 209)"}>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            
            // bgcolor={}
          >
            <MenuItem onClick={handleClose} key={1} className='standard'>
              <Grid2 container flexDirection={'column'}>
                <Grid2>
                  <Typography ><IoStarOutline /> Standard</Typography>
                </Grid2>
                <Grid2>
                  <Typography marginLeft={3}>2048 with powerups</Typography>
                </Grid2>
              </Grid2>

            </MenuItem>

            <MenuItem onClick={handleClose} key={2} className='standard'>
              <Grid2 container flexDirection={'column'}>
                <Grid2>
                  <Typography ><BsFillGridFill /> Classic</Typography>
                </Grid2>
                <Grid2>
                  <Typography marginLeft={3}>The original 2048, no undo</Typography>
                </Grid2>
              </Grid2>
            </MenuItem>
            <MenuItem onClick={handleClose} key={3} className='standard'>
              <Grid2 container flexDirection={'column'}>
                <Grid2>
                  <Typography ><FaFlag /> Tutorial</Typography>
                </Grid2>
                <Grid2>
                  <Typography marginLeft={3}>Learn how to play 2048</Typography>
                </Grid2>
              </Grid2>
            </MenuItem>

          </Menu>
          </Box>
        </Grid2>
        <Grid2 container justifyContent={'flex-start'} size={2} >
          <Grid2 size={1}></Grid2>
          <Grid2 container alignContent={'center'} direction={'column'} size={4} className="scoreBoard" borderRadius={3}>
            <Grid2 textAlign={'center'} className="boardName">
              SCORE
            </Grid2>
            <Grid2 textAlign={'center'} className="boardValues">
              {score}
            </Grid2>
          </Grid2>
          <Grid2 size={0.5}></Grid2>
          <Grid2 container alignContent={'center'} direction={'column'} size={4} className="bestScoreBoard" borderRadius={3}>
            <Grid2 textAlign={'center'} className="boardName">
              BEST
            </Grid2>
            <Grid2 textAlign={'center'} className="boardValues">
              {highScore}
            </Grid2>
          </Grid2>
          <Grid2 size={0.7}></Grid2>
        </Grid2>
        <Grid2 container alignItems={'center'} size={5}>
          <Grid2 size={6.4}></Grid2>
          <Grid2 size={2.3}>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScZldyVgauCIUTfGVlV90-7Za_6kYUSMGcaNmh6WGIfOAK_RA
            /viewform?entry.1880902338=Using%20worker%3A%20true%0ARenderer%20initialized%20once%3A%20true%0AWorker%
            20startup%20failed%3A%20false%0AResolution%3A%203%0AWeb%20worker%20supported%3A%20true%0AUser%20agent%
            3A%20Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%
            20Gecko)%20Chrome%2F130.0.0.0%20Safari%2F537.36%20Edg%2F130.0.0.0%0AWindow%20width%3A%201592%0AWindow%
            20height%3A%20921%0AScreen%20width%3A%201600%0AScreen%20height%3A%201000%0ADevice%20pixel%20ratio%3A%202%
            0ACurrent%20URL%3A%20https%3A%2F%2Fplay2048.co%2F%0ACookies%20enabled%3A%20true%0APlatform%3A%20Win32%
            0ABrowser%20version%3A%205.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%
            2C%20like%20Gecko)%20Chrome%2F130.0.0.0%20Safari%2F537.36%20Edg%2F130.0.0.0%0ABrowser%20vendor%3A%20Google%
            20Inc.%0ABrowser%20product%3A%20Gecko%0ADevice%20memory%3A%208"
              underline='hover'
              color='inherit'
              fontSize={16}
            >
              Give Feedback
            </Link>
          </Grid2>
          <Grid2 size={3}>
            <Stack spacing={2.1} >
              <Button variant="contained" className='newGameButton' onClick={() => setNewGameModal(true)}>New Game</Button>
            </Stack>
            <Modal
              open={newGameModal}
              onClose={() => setNewGameModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ border: "0px solid" }}
            >
              <Box sx={
                {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'rgb(234 231 217 )',
                  borderRadius: 9,
                  border: '0px solid white',
                  boxShadow: 24,
                  p: 4,
                }
              }>
                <Typography variant="h4" component="h2" align={'center'} color='rgb(135 114 89)' fontWeight={700}>
                  New Game
                </Typography>
                <Typography sx={{ mt: 2 }} align='center'>
                  Are you sure you want to start a new game?
                </Typography>

                <Grid2 size={10} marginTop={5}>
                  <Button variant="contained" className='newGameButton' fullWidth onClick={() => newGame()}>Start New Game</Button>
                </Grid2>
                <Grid2 size={10} marginTop={2}>
                  <Button variant="outlined" style={{ border: "1px solid rgb(135 114 89)" }} onClick={() => setNewGameModal(false)} fullWidth color='rgb(135 114 89)'>Cancel</Button>
                </Grid2>
              </Box>
            </Modal>
          </Grid2>
          <Grid2 size={0.2}></Grid2>
        </Grid2>
      </Grid2>

      <Grid2 container justifyContent={'center'} size={12} marginTop={8}>
        <Grid2 size={5.4} justifyContent={'center'}>
          <svg width={576} height={530} viewBox='0 0 376 610' xmlns="http://www.w3.org/2000/svg" >
            <g>
              <rect width="492" height="492" rx="25" fill='#9c8979' />
            </g>
            {positiongrid.map((i) => defaultlayout(i))}
            {positiongrid.map((numX) => updatedLayout(numX, positiongrid.indexOf(numX)))}
          </svg>
        </Grid2>
      </Grid2>

      <Grid2 container justifyContent={'center'} size={12} marginTop={5} marginRight={5}>
        <Grid2 container justifyContent={'center'} className="footer" spacing={2}>
          <Tooltip title={<><b>UNDO</b>   0 use left<br />Make a 128 tile to get more uses</>} placement="top" className='tooltipFonts'>
            <Grid2 justifyContent={'center'}>
              <Button variant="contained" className='footerButton' ><LuUndo2 size={28} /></Button>
              <Typography ><IoRemoveOutline size={30} /><IoRemoveOutline size={30} /></Typography>
            </Grid2>
          </Tooltip>
          <Tooltip title={<><b>SWAP TWO TILES</b> 0 use left<br />Make a 256 tile to get more uses</>} placement="top" className='tooltipFonts'>
            <Grid2 justifyContent={'center'}>
              <Button variant="contained" className='footerButton' ><RiSwap2Fill size={28} /></Button>
              <Typography ><IoRemoveOutline size={30} /><IoRemoveOutline size={30} /></Typography>
            </Grid2>
          </Tooltip>
          <Tooltip title={<><b>DELETE TILES BY NUMBER</b> 0 use left<br />Make a 512 tile to get more uses</>} placement="top" className='tooltipFonts'>
            <Grid2 justifyContent={'center'}>
              <Button variant="contained" className='footerButton' ><BsGridFill size={28} /></Button>
              <Typography ><IoRemoveOutline size={30} /><IoRemoveOutline size={30} /></Typography>
            </Grid2>
          </Tooltip>
          <Tooltip title={<><b>NEED MORE POERUPS?</b><br />Play <b>2048 Plus</b> to get bonus powerups!<br />Only with Self Prime.</>} placement="top" className='tooltipFonts'>
            <Grid2 justifyContent={'center'} >
              <Button variant="contained" className='footerButton' ><RiVipCrownFill size={28} /></Button>
            </Grid2>
          </Tooltip>
        </Grid2>
      </Grid2>

      <Grid2 container justifyContent={'center'} size={12} marginTop={3}>
        <Typography fontSize={14}>2048-self-game.com © 2024 Sridharan Coder. All rights reserved.</Typography>
      </Grid2>

    </>
  );
}

export default App;