const getMatchedUseInfo = (users: any[], userLoggedIn: any) => {
  const newUsers = { ...users };

  delete newUsers[userLoggedIn];

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};

export default getMatchedUseInfo;
