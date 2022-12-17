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
  const FlashLoan = await hre.ethers.getContractFactory("FlashLoan");
  const flashLoan = await FlashLoan.deploy(
    "0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D"
  );

  await flashLoan.deployed();

  console.log("Flash loan contract deployed: ", flashLoan.address);
  
  sleep(10000);   

  if (network.name == "bscTestnet" || network.name == "goerli")  {
      await hre.run("verify:verify", {
          address: flashLoan.address,
          constructorArguments: [
             "0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D"
          ],
      })
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
