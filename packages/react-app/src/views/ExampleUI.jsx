import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Row, Progress, Slider, Spin, Switch, Col, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import { Address, Balance } from "../components";
import { useContractReader } from "../hooks";
import Unity, { UnityContext } from "react-unity-webgl";
const { ethers } = require("ethers");
const unityContext = new UnityContext({
  loaderUrl: "unity/Build/CrabbyUnity.loader.js",
  dataUrl: "unity/Build/CrabbyUnity.data",
  frameworkUrl: "unity/Build/CrabbyUnity.framework.js",
  codeUrl: "unity/Build/CrabbyUnity.wasm",
});
function MintCrabbyUnity() {
  console.log("mint crabby");
  unityContext.send("controller", "mintCrabby");
}
function balanceCrabby(balance) {
  console.log(balance);
  for (let i = 0; i < balance / 1e18; i++) {
    MintCrabbyUnity();
  }
}
function EtherBalanceToUnity(amount) {
  console.log(`EtherBalanceToUnity ${amount}`);
  unityContext.send("controller", "showBalance", amount);
}

export default function ExampleUI({
  //purpose,
  // setPurposeEvents,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  unityContext.on("MintCrabbyFromUnity", () => {
    const result = tx(writeContracts.YourContract.airDrop(), update => {
      console.log("📡 Transaction Update:", update);
      if (update && (update.status === "confirmed" || update.status === 1)) {
        console.log(" 🍾 Transaction " + update.hash + " finished!");
        console.log(
          " ⛽️ " +
            update.gasUsed +
            "/" +
            (update.gasLimit || update.gas) +
            " @ " +
            parseFloat(update.gasPrice) / 1000000000 +
            " gwei",
        );
        MintCrabbyUnity();
      }
    });
    console.log("awaiting metamask/web3 confirm result...", result);
  });
  const [connected, setConnected] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newBalance, SetNewBalance] = useState("0");
  const getBalance = useContractReader(writeContracts, "YourContract", "balanceOf", [address]);
  useEffect(() => {
    unityContext.on("canvas", function () {
      setIsLoaded(true);
    });
  }, [newBalance]);
  const [recipeintAddress, setRecipeintAddress] = useState("");
  const [amount, setNewAmount] = useState(0);
  return (
    <div>
      {/* {newBalance &&  unityContext.send("controller", "showBalance", newBalance.toString() / 1e18)} */}
      {/* {isLoaded &&  unityContext.send("controller", "mintCrabby")} */}
      {/* {isLoaded && timeout} */}
      {/* {isLoaded && myMainnetGLDBalance && } */}
      {/* {isLoaded && unityContext.send("controller", "showBalance", myMainnetGLDBalance / 1e18)} */}
      {/* {myMainnetGLDBalance && unityContext.send("controller", "showBalance", myMainnetGLDBalance / 1e18)} */}
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 1024, margin: "auto", marginTop: 64 }}>
        {/* {isLoaded && getBalance && unityContext.send("controller", "showBalance", getBalance.toString() / 1e18)}
        {isLoaded && getBalance && console.log(`showBalance${ getBalance.toString() / 1e18}`)} */}
        <>
          <Row>
            <Col span={6}>
              <Button
                style={{ marginTop: 8 }}
                onClick={async () => {
                  unityContext.send("controller", "showBalance", getBalance.toString() / 1e18);
                  setConnected(true);
                }}
              >
                Connect to Unity
              </Button>
            </Col>
            {connected && (
              <>
                <Col span={6}>
                  <h2>Contract Address:</h2>
                </Col>
                <Col span={6}>
                  <Address
                    address={readContracts && readContracts.YourContract ? readContracts.YourContract.address : null}
                    ensProvider={mainnetProvider}
                    fontSize={24}
                  />
                </Col>
                <Col span={6}>{getBalance && <h2>Balance: {ethers.utils.formatEther(getBalance.toString())}</h2>}</Col>
              </>
            )}
          </Row>
          <Divider />
        </>
        <Unity unityContext={unityContext} />
        {/* <Divider />
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            unityContext.send("controller", "mintCrabby");
          }}
        >
          MintCrabby
        </Button> */}
        {}

        {/* <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            unityContext.send("controller", "destroyCrabby");
          }}
        >
          DestroyCrabby
        </Button> */}
        {/* <h2>Example UI:</h2>
        {getBalance && <h4>Balance: {ethers.utils.formatEther(getBalance.toString())}</h4>}
        <Divider /> */}
        {/* <div style={{ margin: 8 }}> */}
        {/* <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              const result = tx(writeContracts.YourContract.airDrop(), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                  SetNewBalance(myMainnetGLDBalance.toString());
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
            }}
          >
            Air drop!
          </Button> */}
        {/* </div>
        <Divider /> */}
        {/* <div style={{ margin: 8 }}> */}
        {/* <Input
            onChange={e => {
              setAddres(e.target.value);
            }}
          /> */}
        {/* <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              SetNewBalance(myMainnetGLDBalance.toString());
              console.log(myMainnetGLDBalance.toString());
              if (newBalance != "0") {
                console.log(newBalance / 1e18);
                for (let i = 0; i < newBalance / 1e18; i++) {
                  MintCrabbyUnity();
                  console.log(i);
                  // more statements
                }
              }
            }}
          >
            Balance!
          </Button> */}
        {/* </div>
        <Divider /> */}
        {connected && (
          <>
            <div style={{ margin: 8 }}>
              <h2>Transfer crabby token:</h2>
              <Row>
                <Col span={6}>
                  <Slider
                    min={0}
                    max={getBalance / 1e18}
                    onChange={e => {
                      setNewAmount(e);
                    }}
                    value={typeof amount === "number" ? amount : 0}
                  />
                </Col>
                <Col span={6}>
                  <InputNumber
                    min={0}
                    max={getBalance / 1e18}
                    // style={{ margin: "0 16px" }}
                    value={typeof amount === "number" ? amount : 0}
                    onChange={e => {
                      setNewAmount(e);
                    }}
                  />
                </Col>
                <Col span={6}>
                  <Input
                    placeholder="Address"
                    onChange={e => {
                      setRecipeintAddress(e.target.value);
                    }}
                    value={recipeintAddress}
                  />
                </Col>
                <Col span={6}>
                  <Button
                    // style={{ marginTop: 8 }}
                    onClick={async () => {
                      console.log(amount);
                      console.log(recipeintAddress);
                      const result = tx(
                        writeContracts.YourContract.transfer(recipeintAddress, `${amount * 1e18}`),
                        update => {
                          console.log("📡 Transaction Update:", update);
                          if (update && (update.status === "confirmed" || update.status === 1)) {
                            console.log(" 🍾 Transaction " + update.hash + " finished!");
                            console.log(
                              " ⛽️ " +
                                update.gasUsed +
                                "/" +
                                (update.gasLimit || update.gas) +
                                " @ " +
                                parseFloat(update.gasPrice) / 1000000000 +
                                " gwei",
                            );
                            for (let i = 0; i < amount; i++) {
                              unityContext.send("controller", "destroyCrabby");
                              // more statements
                            }
                            // SetNewBalance(myMainnetGLDBalance.toString());
                          }
                        },
                      );
                      console.log("awaiting metamask/web3 confirm result...", result);
                    }}
                  >
                    Send transcation
                  </Button>
                </Col>
              </Row>
            </div>
            <Divider />
          </>
        )}
      </div>
    </div>
  );
}
