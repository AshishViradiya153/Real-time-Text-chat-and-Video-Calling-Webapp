import React, { useEffect } from "react";
import MessageHeader from "./MessageHeader";
import { styled } from "@mui/system";
import Message from "./Message";
import { useSelector } from "react-redux";
import DateSeprater from "./DateSeprater";
const MainContainer = styled("div")({
  height: "calc(100% - 64px )",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&::-webkit-scrollbar": {
    width: "0.6em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgb(229, 240, 255)",
    borderRadius: "5px",
    outline: "0.5px solid #4892f6",
  },
});

// const DUMMY_DATA = [
//   {
//     id: 1,
//     author: { username: "Ashish" },
//     content: "Hello there",
//     sameAuthor: false,
//     date: "22/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 2,
//     author: { username: "Ashish" },
//     content: "Hello Elahe",
//     sameAuthor: true,
//     date: "22/01/2022",
//     sameDay: true,
//   }
//   {
//     id: 5,
//     author: { username: "Elahe" },
//     content: "Hello there",
//     sameAuthor: true,
//     date: "24/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 1,
//     author: { username: "Ashish" },
//     content: "Hello there",
//     sameAuthor: false,
//     date: "22/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 2,
//     author: { username: "Ashish" },
//     content: "Hello Elahe",
//     sameAuthor: true,
//     date: "22/01/2022",
//     sameDay: true,
//   },
//   {
//     id: 3,
//     author: { username: "Ashish" },
//     content: "Hello there",
//     sameAuthor: true,
//     date: "23/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 4,
//     author: { username: "Elahe" },
//     content: "Hello there Ashish",
//     sameAuthor: false,
//     date: "23/01/2022",
//     sameDay: true,
//   },
//   {
//     id: 5,
//     author: { username: "Elahe" },
//     content: "Hello there",
//     sameAuthor: true,
//     date: "24/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 1,
//     author: { username: "Ashish" },
//     content: "Hello there",
//     sameAuthor: false,
//     date: "22/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 2,
//     author: { username: "Ashish" },
//     content: "Hello Elahe",
//     sameAuthor: true,
//     date: "22/01/2022",
//     sameDay: true,
//   },
//   {
//     id: 3,
//     author: { username: "Ashish" },
//     content: "Hello there",
//     sameAuthor: true,
//     date: "23/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 4,
//     author: { username: "Elahe" },
//     content: "Hello there Ashish",
//     sameAuthor: false,
//     date: "23/01/2022",
//     sameDay: true,
//   },
//   {
//     id: 5,
//     author: { username: "Elahe" },
//     content: "Hello there",
//     sameAuthor: true,
//     date: "24/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 1,
//     author: { username: "Ashish" },
//     content: "Hello there",
//     sameAuthor: false,
//     date: "22/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 2,
//     author: { username: "Ashish" },
//     content: "Hello Elahe",
//     sameAuthor: true,
//     date: "22/01/2022",
//     sameDay: true,
//   },
//   {
//     id: 3,
//     author: { username: "Ashish" },
//     content: "Hello there",
//     sameAuthor: true,
//     date: "23/01/2022",
//     sameDay: false,
//   },
//   {
//     id: 4,
//     author: { username: "Elahe" },
//     content: "Hello there Ashish",
//     sameAuthor: false,
//     date: "23/01/2022",
//     sameDay: true,
//   },
//   {
//     id: 5,
//     author: { username: "Elahe" },
//     content: "Hello there",
//     sameAuthor: true,
//     date: "24/01/2022",
//     sameDay: false,
//   },
// ];

const Messages = ({ chosenChatDetails }) => {
  const { messages } = useSelector((store) => store.chat);
  const convertDateReadable = (date, format) => {
    const map = {
      dd: date.getDate().toString().padStart(2, "0"),
      mm: (date.getMonth() + 1).toString().padStart(2, "0"),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear(),
    };
    return format.replace(/dd|mm|yyyy|yy/gi, (matched) => map[matched]);
  };
  useEffect(() => {
    const messagesContainer = document.getElementById("messagesContainer");

    function scrollToBottom() {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    scrollToBottom();
  }, [messages]);

  return (
    <MainContainer id="messagesContainer">
      <MessageHeader username={chosenChatDetails?.name} />
      {messages?.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index]?.author?._id === messages[index - 1]?.author?._id;

        const sameDay =
          index > 0 &&
          convertDateReadable(new Date(message?.date), "dd/mm/yy") ===
            convertDateReadable(
              new Date(messages[index - 1]?.date),
              "dd/mm/yy"
            );
        const time = `${new Date(message?.date)
          .getHours()
          .toString()
          .padStart(2, "0")}:${new Date(message?.date)
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        return (
          <div
            key={message._id}
            style={{ width: "98%" }}
            className="oneMessage"
          >
            {(!sameDay || index === 0) && (
              <DateSeprater
                date={convertDateReadable(new Date(message.date), "dd/mm/yyyy")}
              />
            )}
            <Message
              name={message.author.username}
              content={message.content}
              date={convertDateReadable(new Date(message.date), "dd/mm/yyyy")}
              sameAuthor={sameAuthor}
              time={time}
              sameDay={sameDay}
            />
          </div>
        );
      })}
    </MainContainer>
  );
};

export default Messages;
