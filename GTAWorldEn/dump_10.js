{
let debug_screen_to_world = false;

let gameplay_cam = mp.cameras.new("gameplay");

function screen_coords_to_world_coords(screenX, screenY, flags, ignore) {
    
    let camPos = gameplay_cam.getCoord();
    let r_coords = get_relative_coords(screenX, screenY);
    
    let target = screen_to_world(camPos, r_coords.x, r_coords.y);
    let dir = subtract_vectors(target, camPos);
    let from = add_vectors(camPos, multiply_vector_by_scalar(dir, 0.05));
    let to = add_vectors(camPos, multiply_vector_by_scalar(dir, 300));
    
    let ray = mp.raycasting.testPointToPoint(from, to, ignore, flags);
    return ray === undefined ? undefined : ray.position;
}

function screen_coords_to_entity(absoluteX, absoluteY, flags, ignore) {
    
    let camPos = gameplay_cam.getCoord();
    let r_coords = get_relative_coords(absoluteX, absoluteY);
    
    let target = screen_to_world(camPos, r_coords.x, r_coords.y);
    let dir = subtract_vectors(target, camPos);
    let from = add_vectors(camPos, multiply_vector_by_scalar(dir, 0.05));
    let to = add_vectors(camPos, multiply_vector_by_scalar(dir, 300));
    
    draw_line(from, to);

    let ray = mp.raycasting.testPointToPoint(from, to, ignore, flags);
    return ray === undefined ? undefined : ray.entity;
}

function screen_to_world(camPos, relX, relY) {
    let camRot = gameplay_cam.getRot(0);
    let camForward = rot_to_dir(camRot);

    let rotUp = add_vectors(camRot, new mp.Vector3(10, 0, 0));
    let rotDown = add_vectors(camRot, new mp.Vector3(-10, 0, 0));
    let rotLeft = add_vectors(camRot, new mp.Vector3(0, 0, -10));
    let rotRight = add_vectors(camRot, new mp.Vector3(0, 0, 10));
    
    let camRight = subtract_vectors(rot_to_dir(rotRight), rot_to_dir(rotLeft));
    let camUp = subtract_vectors(rot_to_dir(rotUp), rot_to_dir(rotDown));
    
    let roll_as_rad = -deg_to_rad(camRot.y);
    
    let camRightRoll = subtract_vectors(multiply_vector_by_scalar(camRight, Math.cos(roll_as_rad)), multiply_vector_by_scalar(camUp, Math.sin(roll_as_rad)));
    let camUpRoll = add_vectors(multiply_vector_by_scalar(camRight, Math.sin(roll_as_rad)), multiply_vector_by_scalar(camUp, Math.cos(roll_as_rad)));
    
    let point3D = add_vectors(add_vectors(add_vectors(camPos, multiply_vector_by_scalar(camForward, 10.0)), camRightRoll), camUpRoll);
    let point2D = world_to_screen(point3D);
    
    if (point2D === undefined) {
        return add_vectors(camPos, multiply_vector_by_scalar(camForward, 10.0));
    }
    
    let point3DZero = add_vectors(camPos, multiply_vector_by_scalar(camForward, 10.0));
    let point2DZero = world_to_screen(point3DZero);
    
    if (point2DZero === undefined) {
        return add_vectors(camPos, multiply_vector_by_scalar(camForward, 10.0));
    }
    
    var tolerance = 0.001;
    if (Math.abs(point2D.x - point2DZero.x) < tolerance || Math.abs(point2D.y - point2DZero.y) < tolerance) {
        return add_vectors(camPos, multiply_vector_by_scalar(camForward, 10.0));
    }

    var scale_x = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
    var scale_y = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
    
    return add_vectors(add_vectors(add_vectors(camPos, multiply_vector_by_scalar(camForward, 10.0)), multiply_vector_by_scalar(camRightRoll, scale_x)), multiply_vector_by_scalar(camUpRoll, scale_y));;
}

function get_relative_coords(x, y) 
{
    let screen = mp.game.graphics.getScreenActiveResolution(0, 0);
    let rx = (1 - ((x / screen.x) * 1.0) * 2);
    let ry = (1 - ((y / screen.y) * 1.0) * 2);

    if (rx > 0.0) 
    {
        rx = -rx;
    }
    else 
    {
        rx = Math.abs(rx);
    }
    
    if (ry > 0.0) 
    {
        ry = -ry;
    }
    else 
    {
        ry = Math.abs(ry);
    }

    return { x: rx, y: ry };
}

function world_to_screen(pos) 
{
    let r = mp.game.graphics.world3dToScreen2d(pos.x, pos.y, pos.z);
    return r == undefined ? undefined : new mp.Vector3((r.x - 0.5) * 2, (r.y - 0.5) * 2, 0);
}

function rot_to_dir(rot) 
{
    let z = deg_to_rad(rot.z);
    let x = deg_to_rad(rot.x);
    let n = Math.abs(Math.cos(x));
    return new mp.Vector3((-Math.sin(z) * n), (Math.cos(z) * n), Math.sin(x));
}

function add_vectors(v1, v2) 
{
    return new mp.Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

function subtract_vectors(v1, v2) 
{
    return new mp.Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

function multiply_vector_by_scalar(vector, scalar) 
{
    return new mp.Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar);
}

function deg_to_rad(degrees) 
{
    return degrees * Math.PI / 180.0;
}

let line_vector1 = null;
let line_vector2 = null;

function draw_line(vector1, vector2) {
    line_vector1 = vector1;
    line_vector2 = vector2;
}

mp.events.add("render", () => {

    if(!debug_screen_to_world) return;
    if(line_vector1 == null || line_vector1 == null) return;
    
    mp.game.graphics.drawLine(line_vector1.x, line_vector1.y, line_vector1.z, line_vector2.x, line_vector2.y, line_vector2.z, 255, 125, 75, 255);
});
}