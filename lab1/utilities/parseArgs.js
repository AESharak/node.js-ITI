function parseArgs(args) {
  return args.reduce((acc, arg) => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      acc[key] = value;
    }
    return acc;
  }, {});
}

export default parseArgs;
