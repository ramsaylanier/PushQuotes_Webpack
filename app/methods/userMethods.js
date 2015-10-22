Meteor.methods({
  updateUserAvatar: function(){
      let user = Meteor.users.findOne(this.userId);
      console.log(user);
  }
})
