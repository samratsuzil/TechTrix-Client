/*
let staticdata = {
  "ejeh6d2la-ZeRhhDahMedYUCOoPUhZpHS6YYG6XkNgg=": {
    HashID: "ejeh6d2la-ZeRhhDahMedYUCOoPUhZpHS6YYG6XkNgg=",
    TransactionInfo: {
      Subject: "child one",
      Body: " This is child one",
      CreatedAt: 1557596584,
      Amount: 1000,
      User: "Karmarchari32"
    },
    ParentHash: "uKG6FBvzEqf6d9Sz4XiMj1-ilCbLWKiVmTEEF23AjLc="
  },
  "uKG6FBvzEqf6d9Sz4XiMj1-ilCbLWKiVmTEEF23AjLc=": {
    HashID: "uKG6FBvzEqf6d9Sz4XiMj1-ilCbLWKiVmTEEF23AjLc=",
    TransactionInfo: {
      Subject: "Root Node",
      Body: "This is root node all nodes of seven kingdom",
      CreatedAt: 1557596584,
      Amount: 10000,
      User: "Karmarchari32"
    },
    ParentHash: ""
  },
  "ukP80BcdjewEL3QtGeohc8bvAZGGicImfrNMg-hKdDM=": {
    HashID: "ukP80BcdjewEL3QtGeohc8bvAZGGicImfrNMg-hKdDM=",
    TransactionInfo: {
      Subject: "child two",
      Body: " This is child two",
      CreatedAt: 1557596584,
      Amount: 1000,
      User: "Karmarchari32"
    },
    ParentHash: "uKG6FBvzEqf6d9Sz4XiMj1-ilCbLWKiVmTEEF23AjLc="
  },
  "z9Z2jNhDCsuorR84wPnQxGRMfReNglkzK5GWFniGYoA=": {
    HashID: "z9Z2jNhDCsuorR84wPnQxGRMfReNglkzK5GWFniGYoA=",
    TransactionInfo: {
      Subject: "grandchild one",
      Body: " This is gchild one",
      CreatedAt: 1557596584,
      Amount: 1000,
      User: "Karmarchari32"
    },
    ParentHash: "ejeh6d2la-ZeRhhDahMedYUCOoPUhZpHS6YYG6XkNgg="
  }
}; */

export default function TransformData(data) {
  //t["attributes"] = t["TransactionInfo"];
  /*
  let allval = {};

  Object.entries(data).forEach(val => {
    val["attributes"] = val["TransactionInfo"];

    allval[val.HashID] = val;
  });
  */
 const new_data = []

  let _data = Object.values(data).forEach((res)=>{
    console.log(res.TransactionInfo.Subject);
    new_data.push({
      name:res.TransactionInfo.Subject,
      attributes:
        res.TransactionInfo,
    })

  });

  console.log("=====",new_data,"====");

  return listToTree(new_data, {
    idKey: "HashID",
    parentKey: "ParentHash"
  });
}

function listToTree(data, options) {
  options = options || {};
  var ID_KEY = options.idKey || "id";
  var PARENT_KEY = options.parentKey || "parent";
  var CHILDREN_KEY = options.childrenKey || "children";

  var tree = [],
    childrenOf = {};
  var item, id, parentId;

  for (var i = 0, length = data.length; i < length; i++) {
    item = data[i];
    id = item[ID_KEY];
    parentId = item[PARENT_KEY] || "";
    // every item may have children
    childrenOf[id] = childrenOf[id] || [];
    // init its children
    item[CHILDREN_KEY] = childrenOf[id];
    if (parentId !== "") {
      // init its parent's children object
      childrenOf[parentId] = childrenOf[parentId] || [];
      // push it into its parent's children object
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}

//console.log(TransformData(staticdata));
