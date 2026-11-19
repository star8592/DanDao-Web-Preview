import{dn as b,aB as S,Y as g,dp as N,C as T,k as l,e as q,aa as M}from"./pill-aura-CuJA8Fm1.js";const E=`out vec3 vLocal;
void main(){
  vLocal=position;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}`,L=`precision highp float;
in vec3 vLocal;
out vec4 outColor;
uniform vec3 uEye,uSize,uTint;
uniform float uTime,uDensity,uPulse,uNature,uSteps;
float hash(vec3 p){
  p=fract(p*.1031);
  p+=dot(p,p.yxz+33.33);
  return fract((p.x+p.y)*p.z);
}
float noise3(vec3 p){
 vec3 i=floor(p),f=fract(p);
 f=f*f*(3.-2.*f);
 return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),
                mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float spirit(vec3 q){
  float y=clamp((q.y+.53)/1.10,0.,1.);
  float envelope=smoothstep(.01,.22,y)*
    (1.-smoothstep(.79,1.,y));
  float flow=uTime*.47;
  float n=noise3(q*vec3(4.2,6.8,5.3)+vec3(0.,flow,.4*flow));
  float micro=noise3(q*vec3(11.5,15.1,12.3)+vec3(flow,-flow,.3));
  float x=.0,z=.0,r=.14;
  if(uNature<1.5){ // 木：纵向主干，侧芽分叉
    x=.09*sin(y*6.7)+.13*smoothstep(.45,.90,y);
    z=.055*cos(y*8.);
    r=.145+.08*sin(y*7.3)*sin(y*7.3);
  }else if(uNature<2.5){ // 阴：月魄半弧
    x=.14*sin(y*5.6-.8)-.07;
    z=.11*cos(y*5.3);
    r=.11;
  }else if(uNature<3.5){ // 火：收束上升的裂焰
    x=.125*sin(y*10.-flow*1.3)*(1.-y*.24);
    z=.075*cos(y*9.+flow);
    r=.20*(1.-.58*y);
  }else if(uNature<4.5){ // 金：棱柱心脉
    x=.015*sin(y*11.);
    z=.045*sin(y*4.);
    r=.12+.03*cos(y*15.);
  }else if(uNature<5.5){ // 水：双向绕流
    x=.16*sin(y*8.2+flow*.6);
    z=.13*cos(y*8.2+flow*.6);
    r=.145;
  }else if(uNature<6.5){ // 毒：反卷的蚀气
    x=.18*sin(y*12.-flow*.8);
    z=.09*cos(y*10.+flow);
    r=.14+.035*sin(y*18.);
  }else{ // 异变：扭转断续
    x=.14*sin(y*17.+flow*.2);
    z=.14*cos(y*13.-flow*.25);
    r=.13;
  }
  vec2 offset=q.xz-vec2(x,z);
  float contour=dot(offset,offset)/(r*r);
  float body=exp(-1.45*contour);
  float halo=exp(-.32*contour)*.14;
  // Noise changes the true 3D density, never a surface alpha texture.
  float breath=.40+.58*n+.15*(micro-.5);
  float intermittence=uNature>6.5?
    (.69+.31*smoothstep(.20,.78,micro)):1.;
  float edge=1.-smoothstep(.39,.54,abs(q.x));
  edge*=1.-smoothstep(.24,.325,abs(q.z));
  edge*=envelope;
  return (body+halo)*breath*intermittence*edge*uDensity;
}
void main(){
  vec3 ro=uEye,rd=normalize(vLocal-ro);
  vec3 safe=mix(vec3(-1.),vec3(1.),step(vec3(0.),rd))*max(abs(rd),vec3(.0001));
  vec3 t0=(-uSize*.5-ro)/safe,t1=(uSize*.5-ro)/safe;
  vec3 mn=min(t0,t1),mx=max(t0,t1);
  float enter=max(max(mn.x,mn.y),mn.z);
  float leave=min(min(mx.x,mx.y),mx.z);
  float start=max(enter,0.);
  if(leave<=start)discard;
  float delta=(leave-start)/max(uSteps,1.);
  float a=0.;
  vec3 radiance=vec3(0.);
  for(int i=0;i<18;i++){
    if(float(i)>=uSteps)break;
    vec3 q=ro+rd*(start+(float(i)+.5)*delta);
    float d=spirit(q);
    float da=1.-exp(-d*delta*3.4);
    float tint=.76+.24*noise3(q*vec3(3.6,4.4,3.2));
    vec3 c=uTint*tint*(1.+uPulse*.16);
    radiance+=(1.-a)*c*da;
    a+=(1.-a)*da;
    if(a>.72)break;
  }
  if(a<.012)discard;
  outColor=vec4(radiance/max(a,.0001),min(.24,a));
}`,c=Object.freeze({wood:1,yin:2,fire:3,metal:4,water:5,poison:6,mutation:7}),v=new l(1.1,1.1,.65);function P(n,u,{mobile:m=!1}={}){if(!u?.isCamera)throw new TypeError("Actual scene camera required");const t=new b({uniforms:{uEye:{value:new l},uSize:{value:v.clone()},uTint:{value:new T("#b3c6b0")},uTime:{value:0},uDensity:{value:0},uPulse:{value:0},uNature:{value:3},uSteps:{value:m?10:16}},vertexShader:E,fragmentShader:L,glslVersion:N,transparent:!0,side:g,blending:S,depthTest:!0,depthWrite:!1}),e=new q(new M(...v.toArray()),t);e.name="W22 R7 三维云篆灵息 · ray integrated WebGL2",e.visible=!1,e.frustumCulled=!1,e.raycast=()=>{},e.renderOrder=3,n.add(e);let i={active:!1,steps:t.uniforms.uSteps.value};function p(s,a,r,x,h,w,z){if(!a?.active||!c[r]||a.form<.02||a.scatter>.97)return e.visible=!1,i={active:!1,steps:t.uniforms.uSteps.value},i;e.visible=!0,e.position.copy(x),e.position.z+=.055,e.scale.copy(h),e.rotation.copy(w),e.updateWorldMatrix(!0,!1);const o=t.uniforms;return o.uEye.value.copy(u.getWorldPosition(new l)).applyMatrix4(e.matrixWorld.clone().invert()),o.uDensity.value=Math.min(.58,(a.form*.47+a.breath*.075)*(1-a.scatter)*a.intensity),o.uPulse.value=a.pulse,o.uTime.value=Math.max(0,s),o.uNature.value=c[r],o.uTint.value.set(z),i={active:!0,nature:r,steps:o.uSteps.value,density:o.uDensity.value,kind:"webgl2-true-3d-density"},i}function f(){e.visible=!1,i={active:!1,steps:t.uniforms.uSteps.value}}function d(){f(),n.remove(e),e.geometry.dispose(),t.dispose()}function y(s){t.uniforms.uSteps.value=s?10:16}return{mesh:e,material:t,update:p,clear:f,dispose:d,setMobile:y,get state(){return i}}}export{L as SPIRIT_FRAGMENT,P as createSpiritWebGLVolume};
