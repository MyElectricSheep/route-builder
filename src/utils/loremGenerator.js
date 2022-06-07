const loremGenerator = () => {
  const lorem = [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt ut labore",
    "Et dolore magna aliqua",
    "Sed euismod nisi porta lorem mollis aliquam",
    "Congue nisi vitae suscipit tellus mauris a",
    "Diam in arcu cursus euismod quis viverra nibh cras pulvinar",
    "Elementum pulvinar etiam non quam lacus suspendisse",
    "Posuere sollicitudin aliquam ultrices sagittis",
    "Orci a scelerisque purus",
    "Tempus egestas sed sed risus pretium quam vulputate",
    "Orci porta non pulvinar neque",
    "Laoreet suspendisse interdum",
    "Euismod lacinia at quis risus ",
    "Sed vulputate odio ut enim",
    "Aenean sed adipiscing diam donec",
    "Mattis vulputate enim nulla aliquet",
    "Porttitor lacus. In ante metus dictum",
    "At tempor commodo ullamcorper",
    "Aliquam id diam maecenas ultricies mi eget",
  ];

  const rand = Math.floor(Math.random() * lorem.length);
  return lorem[rand];
};

export default loremGenerator;
