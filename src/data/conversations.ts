export type Message = {
  author: "them" | "me";
  text: string;
  time: string;
};

export type Conversation = {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  online?: boolean;
  preview: string;
  time: string;
  unread?: number;
  messages: Message[];
};

export const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Maya Chen",
    role: "Product designer",
    initials: "MC",
    color: "coral",
    online: true,
    preview: "The new direction feels really strong.",
    time: "10:42 AM",
    messages: [
      {
        author: "them",
        text: "Hey! I just wrapped the first pass on the new workspace. Want to take a look?",
        time: "10:31 AM",
      },
      {
        author: "me",
        text: "Absolutely. I have a few quiet minutes before my next call.",
        time: "10:36 AM",
      },
      {
        author: "them",
        text: "The new direction feels really strong. It is clearer without losing any personality.",
        time: "10:42 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Andre Williams",
    role: "Engineering lead",
    initials: "AW",
    color: "blue",
    preview: "I can ship that by Thursday.",
    time: "Yesterday",
    messages: [
      {
        author: "them",
        text: "I can ship that by Thursday. The API is already in good shape.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "Sofia Patel",
    role: "Content strategist",
    initials: "SP",
    color: "yellow",
    preview: "Sending over the final notes now.",
    time: "Tue",
    unread: 2,
    messages: [
      {
        author: "them",
        text: "Sending over the final notes now. There are a couple of headline options to review.",
        time: "Tue",
      },
    ],
  },
  {
    id: 4,
    name: "Launch crew",
    role: "6 members",
    initials: "LC",
    color: "purple",
    preview: "Nia: Nice work, everyone!",
    time: "Mon",
    messages: [
      {
        author: "them",
        text: "Nia: Nice work, everyone! We are in a great place for the review.",
        time: "Mon",
      },
    ],
  },
];
