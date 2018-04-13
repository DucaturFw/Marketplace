import Web3 from 'web3';

const JOIN_ADDR = '0xad2870197485a3f0ecbfdbd9de54ab90905df2de';

class Wallet {
  constructor() {
    this.initMetaMask();
  }

  initMetaMask() {
    if (typeof web3 == 'undefined') {
      this.state = null;
    } else if (web3.version.network == 'loading') {
      this.state = 'wrong';
    } else {
      // eslint-disable-next-line
      this.web3 = new Web3(web3.currentProvider);
      this.state = 'good';
    }
  }

  isHaveMetaMast() {
    return !!this.web3;
  }

  isAuth() {
    return !!this.getAddr();
  }

  getAddr() {
    if (this.web3.eth.accounts && this.web3.eth.accounts.length > 0) {
      return this.web3.eth.accounts[0];
    }
  }

  send(amount) {
    let tx = {
      from: this.getAddr(),
      to: JOIN_ADDR,
      value: this.web3.toWei(amount)
    }

    if (this.isAuth()) {
      this.web3.eth.sendTransaction(tx,
        function (err, transactionHash) {
          if (!err) {
            console.log('join done', transactionHash);
          }
        }
      );
    }
  }
}

const wallet = new Wallet();

export default wallet;
