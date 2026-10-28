'use strict';
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');
const app = express();
const server = http.createServer(app);
const allowed = (process.env.ALLOWED_ORIGINS || '*').split(',').map(x => x.trim());
const io = new Server(server, { cors: { origin: allowed.includes('*') ? '*' : allowed, methods: ['GET','POST'] } });
const rooms = new Map();
app.get('/', (_req, res) => res.json({name:'PROJECT CRICKETVERSE', status:'online', rooms:rooms.size, note:'Realtime room prototype; not production-grade authoritative gameplay.'}));
app.get('/health', (_req,res)=>res.json({ok:true,rooms:rooms.size,uptime:Math.round(process.uptime())}));
function roomCode(){return 'CV-'+crypto.randomBytes(2).toString('hex').toUpperCase()}
function cleanRoom(v){return String(v||'').toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,10)}
io.on('connection', socket => {
  socket.data.player = 'Player-' + socket.id.slice(0,5);
  socket.on('create-room', () => {
    let code; do { code=roomCode(); } while(rooms.has(code));
    rooms.set(code,{players:new Set([socket.id]),events:[]}); socket.join(code); socket.data.room=code;
    socket.emit('room-created',{room:code,players:1}); io.to(code).emit('room-update',{room:code,players:1});
  });
  socket.on('join-room', payload => {
    const code=cleanRoom(payload && payload.room); if(!code || !rooms.has(code)){socket.emit('server-error',{message:'Room not found. Check the room code or create a new room.'});return;}
    const room=rooms.get(code); if(room.players.size>=2 && !room.players.has(socket.id)){socket.emit('server-error',{message:'This room already has two players.'});return;}
    if(socket.data.room && socket.data.room!==code) leave(socket);
    room.players.add(socket.id);socket.join(code);socket.data.room=code;
    socket.emit('room-joined',{room:code,players:room.players.size});io.to(code).emit('room-update',{room:code,players:room.players.size});
  });
  socket.on('match-event', payload => {
    const code=socket.data.room, room=rooms.get(code);if(!room)return;
    const shot=['DEFEND','DRIVE','SWEEP','LOFT'].includes(payload && payload.shot)?payload.shot:null;
    if(!shot)return;
    const event={type:'delivery',shot,player:socket.data.player,at:Date.now()};room.events.push(event);if(room.events.length>100)room.events.shift();socket.to(code).emit('match-event',event);
  });
  socket.on('disconnect',()=>leave(socket));
});
function leave(socket){const code=socket.data.room;if(!code||!rooms.has(code))return;const room=rooms.get(code);room.players.delete(socket.id);socket.leave(code);socket.data.room=null;if(!room.players.size)rooms.delete(code);else io.to(code).emit('room-update',{room:code,players:room.players.size});}
const port=Number(process.env.PORT)||3000;server.listen(port,'0.0.0.0',()=>console.log(`CricketVerse room server listening on ${port}`));
