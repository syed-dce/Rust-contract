import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { Basic1 } from "../target/types/basic1";

describe("basic1", () => {
  // Configure the client to use the local cluster.
  // const provider = anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.setProvider(anchor.AnchorProvider.local());

  const program = anchor.workspace.Basic1 as Program<Basic1>;

  it("Is initialized!", async () => {
    const myAccount = anchor.web3.Keypair.generate();
    // Add your test here.
    // const tx = await program.methods.initialize().rpc();

    // const tx = await program.methods
    // .initialize()
    // .accounts({ counter: myAccount.publicKey })
    // .signers([myAccount])
    // .rpc()

    // const tx = await program.methods
    // .initialize()
    // .accounts({ counter: myAccount.publicKey })
    // .signers([myAccount])
    // .rpc()

    // const account = await program.account["counter"].fetch(myAccount.publicKey)
    // expect(account.count.toNumber() === 0)

    await program.methods
      .initialize()
      .accounts({
        myAccount: myAccount.publicKey,
        user: anchor.getProvider().publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([myAccount])
      .rpc();

    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // console.log(account);
    assert.ok(account.data.eq(new anchor.BN(0)));

    console.log("Your transaction signature");
  });
});

// import * as anchor from "@project-serum/anchor";
// import { Program } from "@project-serum/anchor";
// import { Basic1 } from "../target/types/basic1";

// describe("basic1", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Basic1 as Program<Basic1>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });
