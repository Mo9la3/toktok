import recordUser from './recordUser.ts';

export default function watchUsers(usersstr: string, output?: string) {
  const watchUsersIter = () => {
    const users = usersstr.split(' ');

    try{
      const checkUser = (i = 0) => {
        if (!window.recording[users[i]]) recordUser(users[i], output);
        else console.log(`\x1b[32mStill recording ${users[i]}\x1b[0m`);
        setTimeout(() => {
          if (i < users.length - 1) checkUser(++i);
          else
            console.log(
              `\x1b[36m\n\n${new Date().toTimeString().slice(0, 8)}       Waiting for recheck in 3m...\n\n\x1b[0m`
            );
        }, 3000);
      };
    } catch(err) {
      console.error(`====> Error recording user ${users[i]}:`, error);
    }
    checkUser();

    setTimeout(watchUsersIter, 180000);
  };

  watchUsersIter();
}
