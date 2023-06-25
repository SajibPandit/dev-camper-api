const mongoose = require('mongoose')
const slugify = require('slugify')

const BootcampSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,'Please add a name'],
        unique : [true,'Name must be unique'],
        trim:true,
        maxlength:[50,'Name cannont be more than 50 characters']
    },
    slug:String,
    description:{
        type:String,
        required: [true,'Please add a description'],
        maxlength:[500,'Description cannont be more than 500 characters']
    },
    website:{
        type:String,
        match:[/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,'Please add a valid URL with HTTP or HTTPS'
    ]
    },
    phone:{
        type:String,
        maxlength: [20,'Phone number cannot be longer than 20 characters']
    },
    email:{
        type:String,
        match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please enter a valid email address']
    },
    address:{
        type:String,
        required:[true,'Please enter an address'],
    },
    location:{
        type:{
            type:String,
            enum:['Point'],
            required:false
        },
        coordinates:{
            type:[Number],
            required:false,
            index:'2dsphere'
        },
        formattedAddress:String,
        street:String,
        city:String,
        state:String,
        zipcode:String,
        country:String
    },
    careers:{
        //Array Of String
        type:[String],
        required:true,
        enum:[
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    avarageRating:{
        type:Number,
        min:[1,'Rating must be at least 1'],
        max:[10,'Rating connot be more than 10']
    },
    avarageCost:Number,
    photo:{
        type:String,
        default:'no-photo.jpg'
    },
    housing:{
        type:Boolean,
        default:false
    },
    jobAssistance:{
        type:Boolean,
        default:false
    },
    jobGuarantee:{
        type:Boolean,
        default:false
    },
    acceptGi:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
//Create Bootcamp slug for the name
BootcampSchema.pre('save',function(next){
    this.slug = slugify(this.name,{lower:true})
    next()
})

module.exports = mongoose.model('Bootcamp',BootcampSchema)