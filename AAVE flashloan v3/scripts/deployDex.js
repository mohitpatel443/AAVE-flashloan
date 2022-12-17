const hre = require("hardhat");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
      currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

async function main() {
  console.log("deploying...");
  const Dex = await hre.ethers.getContractFactory("Dex");
  const dex = await Dex.deploy();

  await dex.deployed();

  console.log("Dex contract deployed: ", dex.address);

  sleep(100000);   

  if (network.name == "goerli") {
      await hre.run("verify:verify", {
          address:  dex.address,
          constructorArguments: [
             
          ],
      })
  }
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
