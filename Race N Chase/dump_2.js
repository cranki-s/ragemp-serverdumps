��v a r   c u r r e n t J a i l T i m e   =   0 ;  
 v a r   l a s t J a i l U p d a t e   =   1 0 ;  
  
 v a r   c h a s e R u n n i n g   =   f a l s e ;  
 v a r   c h a s e T i m e C u r   =   0 ;  
 v a r   c h a s e T i m e M a x   =   3 9 0 ;  
 v a r   c h a s e M o d e   =   0 ;   / /   0 =   S T A N D A R D   |   1 =   B U S T E D   |   a n d   o t h e r s   a s   i n   S C R I P T  
 v a r   c o l l i s i o n T i m e   =   - 1 ;  
 v a r   u p d a t e R a t e   =   2 0 0 ;  
  
 v a r   c h a t S t a t u s   =   f a l s e ;  
 v a r   c h a t S t a t u s L a t e   =   f a l s e ;  
 v a r   l a s t C h a t T o g g l e   =   D a t e . n o w ( ) ;  
 v a r   s t r e e t N a m e   =   n u l l ;  
 v a r   z o n e N a m e   =   n u l l ;  
 v a r   s h o w H u d   =   t r u e ;  
 v a r   r e n d e r N a m e t a g s   =   t r u e ;  
 v a r   c u r r e n t M u t e T i m e   =   0 ;  
 v a r   l a s t M u t e U p d a t e   =   1 0 ;  
 v a r   l a s t F u n c   =   " I n i t " ;  
  
 v a r   B a n k R o b b e r y O n   =   f a l s e ;  
  
 v a r   S h o w V e h i c l e D L   =   f a l s e ;  
 v a r   s p e c C a m   =   n u l l ;  
 v a r   s p e c S t a t e   =   f a l s e ;  
 v a r   s p e c T a r g e t   =   n u l l ;  
 v a r   i s N o C l i p   =   f a l s e ;  
  
 v a r   L a s t K e y P r e s s   =   0 ;  
 v a r   A F K S t a g e   =   0 ;  
 v a r   S e c o n d s S i n c e L a s t K e y P r e s s   =   0 ;   / /   u s i n g   t h i s   f o r   n a m e t a g s  
  
 v a r   s h o w R e t i c u l e   =   t r u e ;  
 v a r   s h o w C u s t o m C r o s s h a i r   =   f a l s e ;  
 v a r   s h o w C u s t o m C r o s s h a i r I n S n i p e r   =   f a l s e ;  
 v a r   a l w a y s S h o w C u s t o m C r o s s h a i r   =   f a l s e ;  
 v a r   c u s t o m C r o s s h a i r O n   =   f a l s e ;  
  
 v a r   U I H u d   =   n u l l ;  
 v a r   U I M e n u   =   n u l l ;  
 v a r   m e n u T o g g l e d   =   f a l s e ;  
 v a r   s c o r e b o a r d T o g g l e d   =   f a l s e ;  
 v a r   s c o r e b o a r d C u r s o r   =   f a l s e ;  
  
 v a r   c u f f T a r g e t   =   n u l l ;  
 v a r   c u f f I n t e r v a l   =   n u l l ;  
  
 v a r   d i s a b l e S p r i n t   =   f a l s e ;  
  
 v a r   F P S   =   0 ;   / /   T h i s   i s   t h e   a c t u a l   f p s .  
 v a r   F P S _ F r a m e s   =   0 ;  
 v a r   F P S _ C a l c   =   D a t e . n o w ( ) ;  
  
 v a r   l o g i n B r o w s e r   =   n u l l ;  
  
 m p . p l a y e r s . l o c a l . T e a m   =   - 1 ;  
 m p . g a m e . v e h i c l e . d e f a u l t E n g i n e B e h a v i o u r   =   f a l s e ;  
 m p . g a m e . g a m e p l a y . e n a b l e M p D l c M a p s ( t r u e ) ;  
 m p . g a m e . p l a y e r . d i s a b l e V e h i c l e R e w a r d s ( ) ;  
 m p . g a m e . p l a y e r . s e t H e a l t h R e c h a r g e M u l t i p l i e r ( 0 . 0 ) ;  
 m p . g a m e . v e h i c l e . s e t E x p e r i m e n t a l A t t a c h m e n t S y n c E n a b l e d ( t r u e ) ;  
 m p . g a m e . g a m e p l a y . s e t F a d e O u t A f t e r D e a t h ( f a l s e ) ;  
 m p . p l a y e r s . l o c a l . s e t C o n f i g F l a g ( 4 2 9 ,   f a l s e ) ;  
 m p . p l a y e r s . l o c a l . s e t R a g d o l l F l a g ( 2 ) ;  
  
 f u n c t i o n   t r a c e L a s t F u n c ( i S t r )  
 {  
         m p . s t o r a g e . d a t a . l a s t F n   =   i S t r ;  
         m p . s t o r a g e . f l u s h ( ) ;  
 }  
  
 t r a c e L a s t F u n c ( " M a i n : : L o a d I P L s ( ) " ) ;  
 / /   w h e r e   I P L   n a m e s   n a m e   o f   y o u r   . y m a p   f i l e   i n   d l c   - >   m a p p i n g . r p f  
 i f ( ! m p . g a m e . s t r e a m i n g . i s I p l A c t i v e ( " b l o c k h e i s t t u n n e l " )   | |   ! m p . g a m e . s t r e a m i n g . i s I p l A c t i v e ( " d e r b y " )   | |    
         ! m p . g a m e . s t r e a m i n g . i s I p l A c t i v e ( " f l o y d s a p t " )   | |   ! m p . g a m e . s t r e a m i n g . i s I p l A c t i v e ( " w h b i g " )   | |    
         ! m p . g a m e . s t r e a m i n g . i s I p l A c t i v e ( " w h m e d " )   | |   ! m p . g a m e . s t r e a m i n g . i s I p l A c t i v e ( " w h s m a l l " ) )  
 {  
 	 m p . g a m e . i n v o k e ( " 0 x D 7 C 1 0 C 4 A 6 3 7 9 9 2 C 9 " ) ;   / /   _ L O A D _ S P _ D L C _ M A P S  
 	 m p . g a m e . i n v o k e ( " 0 x 0 8 8 8 C 3 5 0 2 D B B E E F 5 " ) ;   / /   _ L O A D _ M P _ D L C _ M A P S  
 }  
  
 m p . p l a y e r s . l o c a l . p o s i t i o n   =   n e w   m p . V e c t o r 3 ( - 1 0 1 8 . 5 5