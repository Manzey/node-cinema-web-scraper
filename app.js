

// Check the arguments.
let args = process.argv.slice(2)

if (args.length === 0) {
  console.log('ERROR: No argument(s).')
  process.exit(0)
}

console.log(args)
