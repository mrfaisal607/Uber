const userModel = mongoose.model('User', userSchema);

module.exports.registerUser = async (req,resizeBy,next)