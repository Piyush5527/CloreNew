import React, { useState } from "react";
import cartIcon from '../../icons/cart.svg';
import CartModal from '../Cart/CartModal';
export default function ShowButtonHover() {
    const [style, setStyle] = useState({ display: 'none' });
    const [modalViewer, setModalViewer] = useState(false);
    return (
        <div>

            <div className="App">
                <a 
                    onMouseEnter={() => setModalViewer(true)}
                    onMouseLeave={() => setModalViewer(false)}>
                    Hover over me!
                </a>
                {modalViewer && (
                    <div>
                        <CartModal/>
                    </div>
                )}
            </div>

            {/* <div ><img src={cartIcon} height={30} width={30} />
                <button style={modalViewer}>hello</button>
            </div> */}
        </div>
    );
}