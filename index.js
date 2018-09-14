    const crypto = require('crypto');

    class blockchain{
          
        constructor(){
            if(!blockchain.instance){
                this.pendingTransaction = [];
                this.chain = [];
                blockchain.instance = this;
            }
            return blockchain.instance;
        }

        createGenesisBlock(block)
        {
           this.chain.push(block);
        }

        addtransaction(transaction){
            this.pendingTransaction.push(transaction);
        }

        addBlocktoChain(block){
            if(this.isBlockValid()){
                this.chain.push(block);
                this.pendingTransaction = [];
            }
        }
        isBlockValid(block){
             return block.hash === block.createHash();
        }
    }

    class block{

        constructor(timestamp,transaction,difficulty,previousBlockHash = ''){
           this.timestamp =timestamp;
           this.nonce=0;
           this.transaction = transaction;
           this.previousBlockHash = previousBlockHash;
           this.difficulty=difficulty;
           this.hash=0;
        }
    
        createHash(){
            return  crypto.createHmac('sha256',JSON.stringify(this.transaction))
            .update(JSON.stringify(this.timestamp))
            .update(JSON.stringify(this.previousBlockHash))
            .update(JSON.stringify(this.nonce)).digest('hex');
        } 
        
        createBlock(){
               this.hash = this.createHash();
               while(this.hash.substring(0,this.difficulty) !== Array(this.difficulty+1).join(""))
               {
                    this.hash = this.createHash();
                    this.nonce++;
               }
               return this.hash;
         }
    }

    class transaction{
        constructor(fromAddress,toAddress,amount){
            this.fromAddress = fromAddress;
            this.toAddress = toAddress;
            this.amount = amount;
        }
    }
    
    const chain = new blockchain();
    const GenesisBlock =  new block("01/01/2013","this is genesis",0,'');
    chain.createGenesisBlock(GenesisBlock);
    const concreteTranscation1 = new transaction("alice","bob","10");
    const concreteTranscation2 = new transaction("james","alice","3");
    chain.addtransaction(concreteTranscation1);
    chain.addtransaction(concreteTranscation2);
    var lastBlock = chain.chain.pop();
    const concreteBlock = new block("14/09/2018",JSON.stringify(chain.pendingTransaction),1,lastBlock.hash);
    var lastBlock = concreteBlock.createBlock(lastBlock.hash.toString());
    chain.addBlocktoChain(concreteBlock);
