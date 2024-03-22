import recordUser from './recordUser.ts';

export default function watchUsers(usersstr: string, output?: string) {
  const watchUsersIter = () => {
    try {
      const users = usersstr.split(' ');

      const checkUser = (i = 0) => {
        if (!window.recording[users[i]]) recordUser(users[i], output);
        else console.log(`Still recording ${users[i]}`);
        setTimeout(() => {
          if (i < users.length - 1) checkUser(++i);
          else
            console.log(
              `${new Date().toTimeString().slice(0, 8)}       Waiting for recheck in 1m...\n\n`
            );
        }, 2800);
      };
      checkUser();
    } catch (error) {
      console.error('An error occurred but the script will continue:', error);
    }

    setTimeout(watchUsersIter, 60000);
  };

  watchUsersIter();
}
