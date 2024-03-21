import recordUser from './recordUser.ts';

export default function watchUsers(usersstr: string, output?: string) {
  const watchUsersIter = () => {
    const users = usersstr.split(' ');

    const checkUser = (i = 0) => {
      if (!window.recording[users[i]]) recordUser(users[i], output);
      else console.log(`\x1b[32mStill recording ${users[i]}\x1b[0m`);
      setTimeout(() => {
        if (i < users.length - 1) checkUser(++i);
        else
          console.log(
            `\n\n${new Date().toTimeString().slice(0, 8)}       Waiting for recheck in 3m...\n\n`
          );
      }, 3000);
    };
    try{
      checkUser();
    }
    catch (err) {
      console.error(`====> Error recording user ${users[i]}:`, error);
      watchUsersIter();
    }
    

    setTimeout(watchUsersIter, 120000);
  };

  watchUsersIter();
}
