export { Rock, Country, Pop, HipHop, Classical, Electronic, Jazz, album, Artist}



const Rock: string[] = ["6mdiAmATAx73kdxrNrnlao","0nmQIMXWTXfhgOBdNzhGOs","3RGLhK1IP9jnYFH4BRFJBS","6VDdCwrBM4qQaGxoAyxyJC","6kACVPfCOnqzgfEF5ryl0x","6biWAmrHyiMkX49LkycGqQ","0L8ExT028jH3ddEcZwqJJ5","0epOFNiUfyON9EYx7Tpr6V","1dfeR4HaWDbWqFHLkxsg1d","2ye2Wgw4gimLv2eAKyk1NB"]
const Country: string[] = ["1dID9zgn0OV0Y8ud7Mh2tS","2dyeCWctcFRt3Pha76ONgb","3XnO697XIus1M0cMuxZjos","3RqBeV12Tt7A8xH3zBDDUF","2M4Yt7oKGoYd0wqU44k4i2","03a5eVjzFyQlR4XyVSwt4t","2DnqqkzzDKm3vAoyHtn8So","2sxmKe3CUrWnx7eoXMhOlW","7mPcfx7PhnBh6n4HMCd61A","0oBEeN6BCxEgMogzThqrPf"]
const Pop: string[] = ["5Pwc4xIPtQLFEnJriah9YJ","6vWDO969PvNqNYHIOW5v0m","64M6ah0SkkRsnPGtGiRAbb","6eUKZXaKkcviH0Ku9w2n3V","2FXC3k01G6Gw61bmprjgqS","6JL8zeS1NmiOftqZTRgdTz","1HY2Jd0NmPuamShAr6KMms","3fMbdgg4jU18AjLCKBhRSm"]
const HipHop: string[] = ["1gPhS1zisyXr5dHTYZyiMe","1RyvyyTE3xzB2ZywiAwp0i","4V8LLVI7PbaPR0K2TGSxFF","699OTQXzgjhIYAHMy9RyPD","4sb7rZNN93BSS6Gqgepo4v","20qISvAhX20dpIbOOzGK3q","4EnEZVjo3w1cwcQYePccay","1ZwdS5xdxEREPySFridCfh","55Aa2cqylxrFIXC767Z865","0Y5tJX1MQlPlqiwlOH1tJY"]
const Classical: string[] = ["1aVONoJ0EM97BB26etc1vo","656RXuyw7CE0dtjdPgjJV6","7y97mc3bZRFXzT2szRM4L4","5lpfGaObTKMHdZ4iQZFWnw","33zC4jWgBRURDclBVL7F9W","6uRJnvQ3f8whVnmeoecv5Z","5aIqB5nVVvmFsvSdExz408","4NJhFmfw43RLBLjQvxDuRS"]
const Electronic: string[] = ["5he5w2lnU9x7JFhnwcekXX","5nPOO9iTcrs9k6yFffPxjH","4tZwfgrHOc3mvqYlEYSvVi","75EZuo5MHV2572NRpMWotC","5FWi1mowu6uiU2ZHwr1rby","2CIMQHirSU0MQqyYHq0eOx","7gjAu1qr5C2grXeQFFOGeh","7CajNmpbOovFoOoasH2HaY","1Cs0zKBU1kc0i8ypK3B9ai"]
const Jazz: string[] = ["1YzCsTRb22dQkh9lghPIrp","0kbYTNQb4Pb1rPbbaF0pT4","4F7Q5NV6h5TSwCainz8S5A","1eE9oB7Z69NzfALiUJYKUm","29bSP1G67IixkZAv6VhlaT","3iysE3N9e6nZZ6kHUoiOCl","1UhC1mCcd9SFXLibHhMX61","5hW4L92KnC6dX9t7tYM4Ve","1VEzN9lxvG6KPR3QQGsebR"]


const album: {Rock: string[], Country:string[], Pop:string[], HipHop:string[], Classical:string[], Electronic:string[], Jazz:string[]} = {
    Rock:Rock,
    Country:Country,
    Pop: Pop,
    HipHop: HipHop,
    Classical: Classical,
    Electronic: Electronic,
    Jazz: Jazz

}

interface Artist{
    name: string,
    picture: string,
    isCorrect: boolean,
}