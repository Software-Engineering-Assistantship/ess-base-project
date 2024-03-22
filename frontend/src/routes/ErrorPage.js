import React from "react"
import "../style/Error.css"
import Header from "./commons/Header"

const ErrorPage = () => {
    return (
        <div>
            <Header/>
            <div id="page-error-container">
                <div className="bigger-error">
                <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
	<div class="wheel"></div>
	<div class="hamster">
		<div class="hamster__body">
			<div class="hamster__head">
				<div class="hamster__ear"></div>
				<div class="hamster__eye"></div>
				<div class="hamster__nose"></div>
			</div>
			<div class="hamster__limb hamster__limb--fr"></div>
			<div class="hamster__limb hamster__limb--fl"></div>
			<div class="hamster__limb hamster__limb--br"></div>
			<div class="hamster__limb hamster__limb--bl"></div>
			<div class="hamster__tail"></div>
		</div>
	</div>
	<div class="spoke"></div>
                </div>
                <div id="error-msg">
                    <div id="error-404"> ERROR 404! </div>
                    <div id="error-404-detail"> A página procurada não foi encontrada 😭 </div>
                
                </div>
            </div></div>
            
            
            
        </div>
    )
}

export default ErrorPage