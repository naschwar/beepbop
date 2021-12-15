var vis_container;
var camera, scene, renderer, clock;
vis_container = document.querySelector( '#vis-ui' );
var sizes = {
    width: vis_container.clientWidth,
    height: vis_container.clientHeight
}
init();
animate();

function init() {
    vis_container = document.querySelector( '#vis-container' );
    const sizes = {
      width: vis_container.clientWidth,
      height: vis_container.clientHeight
    }      
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 1;

    scene = new THREE.Scene();
    clock = new THREE.Clock();

    var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

    uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(vis_container.clientWidth, vis_container.clientHeight) },
        u_mouse: { type: "v2", value: new THREE.Vector2()},
        u_ratios: { type: "v3", value: new THREE.Vector3(.5, .5, .5)}
    };
    var material = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );

    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    vis_container.appendChild(renderer.domElement );

    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false );

    document.onmousemove = function(e){
    uniforms.u_mouse.value.x = e.pageX
    uniforms.u_mouse.value.y = e.pageY
    }
}

function onWindowResize( ) {
  sizes = {
    width: vis_container.clientWidth,
    height: vis_container.clientHeight
}
  console.log(sizes.width)
  renderer.setSize( sizes.width, sizes.height );
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  uniforms.u_time.value += clock.getDelta();
  renderer.render( scene, camera );
}