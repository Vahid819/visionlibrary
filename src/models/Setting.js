import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    seatting:{
        type: Object,
        required: true
    },
},
{
    timestamps: true
});
const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);
export default Settings;