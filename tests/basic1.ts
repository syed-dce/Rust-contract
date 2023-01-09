import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { Basic1 } from "../target/types/basic1";

describe("basic1", () => {
  // Configure the client to use the local cluster.
  // const provider = anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.setProvider(anchor.AnchorProvider.local());

  const program = anchor.workspace.Basic1 as Program<Basic1>;

  const myAccount = anchor.web3.Keypair.generate();
  it("Is initialized!", async () => {
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
    // assert.ok(account.data.eq(new anchor.BN(0)));
    assert.equal(account.data, 0);
  });

  it("Is updated!", async () => {
    // Add your test here.

    await program.methods
      .update(new anchor.BN(21))
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.equal(account.data, 21);
  });

  it("Is incremented!", async () => {
    // Add your test here.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    await program.methods
      .increment()
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();

    const accountAfterIncrement = await program.account.myAccount.fetch(
      myAccount.publicKey
    );
    // console.log(account.data.toNumber());
    assert.equal(
      account.data.toNumber() + 1,
      accountAfterIncrement.data.toNumber()
    );
    // assert.equal(account.data.toNumber() + 1, accountAfterIncrement.data );
  });

  it("Is decremented!", async () => {
    // Add your test here.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    await program.methods
      .decrement()
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();

    const accountAfterIncrement = await program.account.myAccount.fetch(
      myAccount.publicKey
    );
    
    assert.equal(
      account.data.toNumber() - 1,
      accountAfterIncrement.data.toNumber()
    );
    
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
