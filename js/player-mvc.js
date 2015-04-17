function Model(){
	this.actual=-1
	this.songs=[]
	this._isPlaying = false
}
Model.prototype = new Observable()
Model.prototype.goTo = function(index){
	this.setActive(index)
}
Model.prototype.setSongs = function(songs){
	this.songs=songs
	this.trigger('songs-changed', this.songs)
}
Model.prototype.getActual = function(){
	return this.songs[this.actual]
}
Model.prototype.getActualIndex = function(){
	return this.actual
}
Model.prototype.setActive = function(index){
	//debugger;
	if(index<0 || index>= this.songs.length) index=0
	this._isPlaying = true
	this.actual=index
	this.trigger('active-songs', this.songs[index])
}
Model.prototype.setPlaying = function(bool){
	this._isPlaying=bool
	if(bool) this.trigger('playing')
	else this.trigger('paused')
}
Model.prototype.isPlaying = function(){
	return this._isPlaying
}

function View(){
	var self=this
	this.elems = {}
	this.elems.audio = document.createElement('audio')
	document.body.appendChild(this.elems.audio)

	this.elems.list = $('#list')
	this.elems.play = $('#play')
	this.elems.next = $('#next')
	this.elems.prev = $('#prev')
	this.elems.avatar = $('.image img')
	this.elems.name = $('.playing .name')
	this.elems.artist = $('.playing .author')

	//delegacion del click
	this.elems.list.on('click', '.song', function(){
		self.trigger('song-clicked', $(this).attr('data-id'))
	})
	this.elems.play.on('click', function(){
		self.trigger('play-clicked')
		return false
	})
	this.elems.next.on('click', function(){
		self.trigger('next-clicked')
		return false
	})
	this.elems.prev.on('click', function(){
		self.trigger('prev-clicked')
		return false
	})

	//creación de mi template de canciones
	this.template = Handlebars.compile($('#song-tmpl')).html())
}
View.prototype= new Observable()
View.prototype.updateList= function(songList){
	this.elems.list.html(this.template({songs: songList}))
}