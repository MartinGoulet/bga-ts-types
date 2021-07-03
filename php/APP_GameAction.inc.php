<?php

abstract class APP_GameAction extends APP_Action
{
    /**
     * @var Karmaka
     */
    protected $game;

    /**
     * @param Karmaka $game
     */
    public function stubGame(Karmaka $game)
    {
        $this->game = $game;
    }

    /**
     * @return Karmaka
     */
    public function getGame()
    {
        return $this->game;
    }

    /**
     * @param int $activePlayerId
     * @return self
     */
    public function stubActivePlayerId($activePlayerId)
    {
        return $this;
    }

    protected static function ajaxResponse($dummy = '')
    {
        if ($dummy != '') {
            throw new InvalidArgumentException("Game action cannot return any data");
        }
    }
}