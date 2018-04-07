
// TODO: get this working with some basic meshes.
function createGeometry(mesh) {
    var r = new THREE.BufferGeometry();
    r.setIndex( mesh.indices );
	this.addAttribute( 'position', new Float32BufferAttribute( mesh.vertices, 3 ) );
	//this.addAttribute( 'normal', new Float32BufferAttribute( mesh.normals, 3 ) );
	//this.addAttribute( 'uv', new Float32BufferAttribute( mesh.uvs, 2 ) );
	//this.addAttribute( 'color', new Float32BufferAttribute( mesh.normals, 3 ) );
}