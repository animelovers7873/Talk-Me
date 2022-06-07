import React, { useState, useEffect, useRef } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, Call, MoreVert, SearchOutlined, Videocam } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { useParams } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from "./StateProvider";

function Chat() {
    const inputFile = useRef(null);
    const scrollRef = useRef();
    const [input, setInput] = useState("");
    const [pickerVisible, togglePicker] = useState(false);
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const onEmojiClick=(event, emojiObj)=>{
        setInput(input + emojiObj.emoji);
    }

    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
      };

    const selectFile = (e) => {
        // setInput(input + e.target.files[0])
        console.log(e.target.files)
    }

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }

    useEffect(()=>{
        if(!scrollRef.current) return
        setTimeout(()=>{
            scrollRef.current.scrollIntoView({behavior: "smooth"})
        },100)
    },[messages?.length])

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat_headerInfo'>
                    <h3 className='chat-room-name'>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                                timestamp?.seconds * 1000
                                ).toLocaleTimeString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <Videocam />
                    </IconButton>
                    <IconButton>
                        <Call />
                    </IconButton>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>

                </div>
            </div>
            <div className='chat_body'>
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestemp">{new Date(message.timestamp?.seconds * 1000
                        ).toLocaleTimeString()}</span>
                    </p>
                ))}
                <span ref={scrollRef}></span>
            </div>
            <div className='chat_footer'>
                <IconButton>
                    <InsertEmoticonIcon onClick={()=>togglePicker(!pickerVisible)}/>
                    {pickerVisible&&(<Picker onEmojiClick={onEmojiClick} />)}
                </IconButton>
                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={selectFile}/>
                <IconButton>
                    <AttachFile onClick={onButtonClick} onChange={selectFile}/>
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
